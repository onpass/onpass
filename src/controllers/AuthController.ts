import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";

import { User } from "../entity/User";
const config = require("../config.json");

class AuthController {
    static login = async (req: Request, res: Response) => {
        //Check if username and password are set
        let { username, password } = req.body;
        if (!(username && password)) {
            res.status(400).send("Pass");
        }

        //Get user from database
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({ where: { username } });
        } catch (error) {
            res.status(401).send("User not found");
        }

        //Check if passwords match
        if (!user.checkPassword(password)) {
            res.status(401).send("Password is incorrect");
            return;
        }

        //Send JWT, valid for 1 hour
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            config.app.secret,
            { expiresIn: "1h" }
        );

        //Send the jwt in the response
        res.cookie('onpass', token, { expires: new Date(Date.now() + 60 * 60 * 1000), httpOnly: true })
            .status(204)
            .send();
    };

    static logout = async (req: Request, res: Response) => {
        if(req.cookies['onpass'])
            res.clearCookie('onpass').status(204).send();
        else 
            res.status(401).send();
    };;

    static check = async (req: Request, res: Response) => {
        if (req.cookies['onpass'])
            res.status(204).send();
        else
            res.status(401).send();
    }
}
export default AuthController;
