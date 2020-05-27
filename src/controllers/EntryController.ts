import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Entry } from "../entity/Entry";
import { User } from "../entity/User";

const alpha = "abcdefghijklmnopqrstuvwxyz";
const num = "0123456789";
const sym = "`~!@#$%^&*()-_=+[]{}\\|\"';:,.<>/?";

/**
 * The controller for all things related to entries
 * @class
 */
class EntryController {
    /**
     * The function that generates a new password based on a request.
     * Request body must contain length and flags for letters, numbers and symbols.
     * 
     * @param req - the request object
     * @param res - the response object
     * @summary Generate a new password from a request
     */
    static newPassword = async (req: Request, res: Response) => {
        let status: number, message: string;
        // Get required data from request body
        let { length, letters, numbers, symbols } = req.body;
        // Check if the number is an integer
        if (!Number.isInteger(length)) {
            status = 400;
            message = "The length must be an integer";
        }
        // Check minimum and maximum length
        if (length < 8 || length > 127) {
            status = 400;
            message = "The length must be between 8 and 127";
        }
        // Check flags
        if (!(letters || numbers || symbols)) {
            status = 400;
            message = "At least one flag must be enabled";
        }

        if (!(status && message)) {
            // Create empty variables for later
            let password = "";
            let character: string;
            while (password.length < length) {
                character = ""
                if (letters) {
                    // Generate a random index
                    let e1 = Math.ceil(alpha.length * Math.random() * Math.random());
                    let h = alpha.charAt(e1);
                    // With a 50% chance, convert a letter to upper case
                    h = Math.random() > 0.5 ? h.toUpperCase() : h;
                    character += h;
                }
                if (numbers) {
                    // Generate a random index
                    let e2 = Math.ceil(num.length * Math.random() * Math.random());
                    character += num.charAt(e2);

                }
                if (symbols) {
                    // Generate a random index
                    let e3 = Math.ceil(sym.length * Math.random() * Math.random());
                    character += sym.charAt(e3);
                }
                // set the password to the temporary password
                password += character;
            }
            // shuffle the string
            message = password.split('').sort(() => { return 0.5 - Math.random() }).join('');
            status = 200;
        }

        res.status(status).json(message);
    }

    /**
     * The function that returns all entries for a user that's stored in a cookie.
     * Must call the checkJwt middleware before this is executed.
     * Request body should be empty.
     * 
     * @param req - the request object
     * @param res - the response object
     * @summary Generate a new password from a request
     */
    static listAll = async (req: Request, res: Response) => {
        // If no userId exists, the user is not logged in
        if (!res.locals.jwtPayload.userId) res.status(403).send("User not logged in");
        const userId = res.locals.jwtPayload.userId;

        const entryRepository = getRepository(Entry);
        try {
            // Try to get the entry that belongs to the user with the specified id
            const entries = await entryRepository.find({
                where: { user: userId },
                select: ["id", "website", "login", "password"],
                relations: ["user"]
            });
            entries.forEach(v => v.decryptData());
            entries.forEach(v => delete v.user);
            console.log(entries);
            
            const count = entries.length;
            res.send({count, entries})
        } catch (error) {
            console.log(error.toString())
            res.status(404).send(error.toString())
        }
    }

    /**
     * The function that returns a single entry by id.
     * Must call the checkJwt middleware before this is executed.
     * Request body must contain the id parameter, which is a number.
     * 
     * @param req - the request object
     * @param res - the response object
     * @summary Generate an entry for an id from a request
     */
    static getOneById = async (req: Request, res: Response) => {
        if (!res.locals.jwtPayload.userId) res.status(403).send("User not logged in");
        const entryRepository = getRepository(Entry);

        try {
            // Try to get the entry with the specified id
            const entry = await entryRepository.findOneOrFail(req.body.id, {
                select: ["id", "website", "login", "password"],
                relations: ["user"]
            });
            entry.decryptData();
            delete entry.user;
            res.send({count: 1, entries: [entry]})
        } catch (error) {
            res.status(404).send("Entry not found")
        }
    }

    /**
     * The function that returns all entries for a website for a user in a cookie.
     * Must call the checkJwt middleware before this is executed.
     * Request body must contain the website, which is a string.
     * 
     * @param req - the request object
     * @param res - the response object
     * @summary Get all entries for a website for a user
     */
    static getAllByWebsite = async (req: Request, res: Response) => {
        // If no userId exists, the user is not logged in
        if (!res.locals.jwtPayload.userId) res.status(403).send("User not logged in");
        const userId = res.locals.jwtPayload.userId;
        const website = req.body.website

        const entryRepository = getRepository(Entry);
        try {
            // Try to get the entry that belongs to the user with the specified id
            const entries = await entryRepository.find({
                where: { user: userId, website },
                select: ["id", "website", "login", "password"],
                relations: ["user"]
            });
            
            // Decrypt data before sending it to the user
            entries.forEach(v => v.decryptData());
            entries.forEach(v => delete v.user);
            const count = entries.length;
            
            res.send({count, entries});
        } catch (error) {
            res.status(404).send("User has no entries")
        }
    }

    /**
     * The function that creates a new entry for a user in a cookie.
     * Must call the checkJwt middleware before this is executed.
     * Request body must contain the website, the login and the passowrd, all of which strings.
     * 
     * @param req - the request object
     * @param res - the response object
     * @summary Create a new entry
     */
    static newEntry = async (req: Request, res: Response) => {
        if (!res.locals.jwtPayload) res.status(403).send("User not logged in");
        const userId = res.locals.jwtPayload.userId;

        // unpack the request body
        const { website, login, password } = req.body;
        
        // create and fill an entry
        let entry = new Entry();
        entry.website = website;
        entry.login = login;
        entry.password = password;

        // get the user
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(userId, {
                select: ["id", "username","password"]
            });
        } catch (error) {
            res.status(404).send("User not found");
        }
        
        entry.user = user;

        // encrypt data and save it to the db
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

    /**
     * The function that modifies an entry by id.
     * Must call the checkJwt middleware before this is executed.
     * Request body must contain the website, the login and the passowrd, all of which strings and the id, which is a number.
     * 
     * @param req - the request object
     * @param res - the response object
     * @summary Modify an entry
     */
    static editEntry = async (req: Request, res: Response) => {
        if (!res.locals.jwtPayload.userId) res.status(403).send("User not logged in");
        // unpack the body
        const {login, website, password, id} = req.body;

        // try to get the required entry
        const entryRepository = getRepository(Entry);
        let entry: Entry;
        try {
            entry = await entryRepository.findOneOrFail(id, {
                select: ["id", "website", "login", "password"],
                relations: ["user"]
            });
            await entryRepository.delete(entry);
        } catch (error) {
            res.status(404).send("Entry not found")
        }

        // decrypt the data, update it and re-encrypt it again
        entry.decryptData();

        entry.website = website ? website : entry.website;
        entry.login = login ? login : entry.login;
        entry.password = password ? password : entry.password;

        entry.encryptData();

        // save the updated entry
        try {
            await entryRepository.save(entry);
            entry.decryptData()
            res.json(entry)
        } catch (e) {
            res.status(409).send("Error saving entry");
            return;
        }
    }

    /**
     * The function that deltes an entry by id.
     * Must call the checkJwt middleware before this is executed.
     * Request body must the id, which is a number.
     * 
     * @param req - the request object
     * @param res - the response object
     * @summary Delete an entry
     */
    static deleteEntry = async (req: Request, res: Response) => {
        if (!res.locals.jwtPayload.userId) res.status(403).send("User not logged in");
        const id = req.body.id;

        // try to get the required entry
        const entryRepository = getRepository(Entry);
        let entry: Entry;
        try {
            entry = await entryRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send("Entry not found");
            return;
        }
        // delete it
        entryRepository.delete(entry);

        res.status(204).send();
    };
}

export default EntryController;
