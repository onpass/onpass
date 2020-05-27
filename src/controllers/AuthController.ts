import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";

import { User } from "../entity/User";
const config = require("../config.json");

/**
 * The controller for all things related to authentication
 * @class
 */
class AuthController {
    /**
     * The function that authenticates a user and creates a cookie.
     * Request body must contain the username and the password, both of which are string.
     * 
     * @param req - the request object
     * @param res - the response object
     * @summary Authenticate a user
     */
    static login = async (req: Request, res: Response) => {
        //Check if username and password are set
        let { username, password } = req.body;
        if (!(username && password)) {
            res.status(400).send("Username or password not set");
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

    /**
     * The function that logs out a user and destroys the cookie.
     * Request body should be empty.
     * 
     * @param req - the request object
     * @param res - the response object
     * @summary Log out a user
     */
    static logout = async (req: Request, res: Response) => {
        if(req.cookies['onpass']) // If a cookie exists, delete it, which will log the user out
            res.clearCookie('onpass').status(204).send();
        else 
            res.status(401).send(); // If the cookie doesn't exist, send an error
    };

    /**
     * The function that checks if the user is logged in.
     * Request body should be empty.
     * 
     * @param req - the request object
     * @param res - the response object
     * @summary Check log in
     */
    static check = async (req: Request, res: Response) => {
        if (req.cookies['onpass'])
            res.status(204).send(); // send a success if a cookie exists
        else
            res.status(401).send(); // and an error if it doesn't
    }
}

export default AuthController;
