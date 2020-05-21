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

    /*let corsOptions = {
        origin: function (origin, callback) {
            if (config.app.corsWhitelist.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        }
    }*/

    let corsOptions = {
        origin: function (origin, callback) {
            callback(null, true)
        }
    }

    app.use(cors(corsOptions))


    // Call midlewares
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(session({ secret: config.app.secret }));

    app.use((req: Request, res: Response, next: NextFunction) => {
        console.log((new Date()).toISOString())
        console.log("Body:")
        console.log(req.body)
        console.log("Headers:")
        console.log(req.headers)
        console.log("Cookies:")
        console.log(req.cookies)
        res.setHeader('Access-Control-Allow-Credentials', 'true')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader("Access-Control-Allow-Methods", "*");
        res.setHeader("Access-Control-Allow-Headers", 'origin, content-type, accept');

        console.log("Response headers:")
        console.log(res.getHeaders())

        next();
    })

    app.use((req, res, next) => {
        res.on('finish', () => {
      
          console.log("Response headers:")
          console.log(res.getHeaders())
        });
        next();
    });

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
