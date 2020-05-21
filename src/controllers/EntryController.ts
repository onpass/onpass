import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Entry } from "../entity/Entry";
import { User } from "../entity/User";

const alpha = "abcdefghijklmnopqrstuvwxyz";
const num = "0123456789";
const sym = "`~!@#$%^&*()-_=+[]{}\\|\"';:,.<>/?";

class EntryController {
    static newPassword = async (req: Request, res: Response) => {
        let { length, letters, numbers, symbols } = req.body;
        if (length < 8 || length > 127) throw RangeError("The length must be between 8 and 127");
        if (!(letters || numbers || symbols)) throw Error("At least one flag must be enabled");

        let password = "";
        let character = "";
        while (password.length < length) {
            if (letters) {
                let e1 = Math.ceil(alpha.length * Math.random() * Math.random());
                let h = alpha.charAt(e1);
                h = Math.random() > 0.5 ? h.toUpperCase() : h;
                character += h;
            }
            if (numbers) {
                let e2 = Math.ceil(num.length * Math.random() * Math.random());
                character += num.charAt(e2);

            }
            if (symbols) {
                let e3 = Math.ceil(sym.length * Math.random() * Math.random());
                character += sym.charAt(e3);
            }
            password = character;
        }
        password = password.split('').sort(() => { return 0.5 - Math.random() }).join('');
        res.send(password)
    }

    static listAll = async (req: Request, res: Response) => {
        if (!res.locals.jwtPayload.userId) res.status(403).send("User not logged in");
        const userId = res.locals.jwtPayload.userId;

        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(userId, {
                select: ["id", "username"]
            });
        } catch (error) {
            res.status(404).send("User not found");
        }

        const entryRepository = getRepository(Entry);
        try {
            const entries = await entryRepository.find({
                where: { user: userId },
                select: ["id", "website", "login", "password"]
            });
            res.send(entries.map(v => v.decryptData));
        } catch (error) {
            res.status(404).send("User has no entries")
        }
    }

    static getOneById = async (req: Request, res: Response) => {
        const entryRepository = getRepository(Entry);

        try {
            const entry = await entryRepository.findOneOrFail(req.body.id, {
                select: ["id", "website", "login", "password"]
            });
            res.send(entry.decryptData());
        } catch (error) {
            res.status(404).send("Entry not found")
        }
    }

    static newEntry = async (req: Request, res: Response) => {
        if (!res.locals.jwtPayload) res.status(403).send("User not logged in");
        const userId = res.locals.jwtPayload.userId;

        const { website, login, password } = req.body;
        let entry = new Entry();
        entry.website = website;
        entry.login = login;
        entry.password = password;

        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(userId, {
                select: ["id", "username"]
            });
        } catch (error) {
            res.status(404).send("User not found");
        }

        entry.user = user;

        entry.encryptData();
        const entryRepository = getRepository(Entry);
        try {
            await entryRepository.save(entry);
        } catch (e) {
            res.status(409).send("Entry already exists");
            return;
        }

        res.status(201).send("Entry created");
    }

    static editEntry = async (req: Request, res: Response) => {
        const id = req.body.id;

        const entryRepository = getRepository(Entry);
        let entry: Entry;
        try {
            entry = await entryRepository.findOneOrFail(id, {
                select: ["id", "website", "login", "password"]
            });
            res.send(entry);
        } catch (error) {
            res.status(404).send("Entry not found")
        }

        entry.decryptData();

        entry.website = req.body.website ? req.body.website : entry.website;
        entry.login = req.body.login ? req.body.login : entry.login;
        entry.password = req.body.password ? req.body.password : entry.password;

        entry.encryptData();

        try {
            await entryRepository.save(entry);
        } catch (e) {
            res.status(409).send("Error saving entry");
            return;
        }
    }

    static deleteEntry = async (req: Request, res: Response) => {
        const id = req.body.id;

        const entryRepository = getRepository(Entry);
        let entry: Entry;
        try {
            entry = await entryRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send("Entry not found");
            return;
        }
        entryRepository.delete(entry);

        res.status(204).send();
    };
}

export default EntryController;
