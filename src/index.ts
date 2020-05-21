import { createConnection } from "typeorm";
import express, { NextFunction } from "express";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import routes from "./routes/index";
import { User } from "./entity/User";
import { Entry } from "./entity/Entry";
import session from "express-session";

const config = require("./config.json");

//Connects to the Database -> then starts the express
createConnection({
    type: "postgres",
    host: config.postgres.url,
    port: config.postgres.port,
    username: config.postgres.username,
    password: config.postgres.password,
    database: config.postgres.database,
    entities: [
        User,
        Entry
    ],
    synchronize: true,
    logging: false
}).then(async c => {
    // Create a new express application instance
    const app = express();

    // Set up CORS
    app.use(cors({ origin: true, credentials: true }))
    app.options('*', cors())

    // Call midlewares
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(session({ secret: config.app.secret }));

    // Create a middleware to log incoming requests
    app.use((req: Request, res: Response, next: NextFunction) => {
        console.log((new Date()).toISOString())

        console.log("URL:")
        console.log(req.url)

        console.log("Body:")
        console.log(req.body)

        console.log("Headers:")
        console.log(req.headers)

        console.log("Cookies:")
        console.log(req.cookies)

        console.log(`Method: ${req.method}`)

        next();
    })

    // Create a middleware to log outcoming responses
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.on('finish', () => {
            console.log("Response headers:")
            console.log(res.getHeaders())
        });
        next();
    });

    // Set all routes from routes folder
    app.use('/', routes)

    // If a get request is made to root, send version
    app.get('/', (req: Request, res: Response) => {
        res.send({ version: 1.0 });
    })

    // Set the used port to the one in config
    const port = config.app.port;

    // Start listening on the specified port
    app.listen(port, () => {
        console.log(`Server started on port ${port}!`);
    });
}).catch(error => console.log(error));
