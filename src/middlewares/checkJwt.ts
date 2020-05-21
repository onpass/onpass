import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
const config = require("../config.json");

export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
    // get the JWT token from the cookie
    const token = req.cookies.onpass || '';
    let jwtPayload;

    try {
        // verify the JWP payload
        jwtPayload = <any>jwt.verify(token, config.app.secret);
        res.locals.jwtPayload = jwtPayload;
    } catch (e) {
        return res.status(401).send(e.toString());
    }

    next();
};
