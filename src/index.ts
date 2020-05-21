import { createConnection } from "typeorm";
import express from "express";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
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
    entities: [
        User,
        Entry
    ],
    synchronize: true,
    logging: false
}).then(async c => {
    // Create a new express application instance
    const app = express();

    // Call midlewares
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(session({ secret: config.app.secret }));

    //Set all routes from routes folder
    app.use('/', routes)

    app.get('/', (req: Request, res: Response) => {
        res.send({ version: 1.0 });
    })

    const port = config.app.port;

    app.listen(port, () => {
        console.log(`Server started on port ${port}!`);
    });
}).catch(error => console.log(error));
