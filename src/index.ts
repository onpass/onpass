import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { User } from "./entity/User";
import { Entry } from "./entity/Entry";
import express, { Request, Response } from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import { v4 as uuidv4 } from 'uuid';

const config = require("./config.json")
const routes = require("./routes.json")

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('trust proxy', 1)
app.use(session({
    genid: function (req) {
        return uuidv4()
    },
    secret: config.app.secret,
    resave: false,
    saveUninitialized: true
}))

app.listen(config.app.port, () => console.log(`Listening on port ${config.app.port}`))

createConnection({
    type: "postgres",
    host: config.postgres.url,
    port: config.postgres.port,
    username: config.postgres.username,
    password: config.postgres.password,
    entities: [
        User
    ],
    synchronize: true,
    logging: false
}).then(async (connection: Connection) => {
    const userRepository = connection.getRepository(User);
    const entryRepository = connection.getRepository(Entry);

    app.get('/', (req: Request, res: Response) => {
        res.send(routes)
    })

    app.get('/users/', async (req: Request, res: Response) => {
        const users = await userRepository.find();
        res.json(users);
    })

    app.get("/users/:id", async (req: Request, res: Response) => {
        const results = await userRepository.findOne(req.params.id);
        return res.send(results);
    });


    app.get('/entries/', async (req: Request, res: Response) => {
        const users = await entryRepository.find();
        res.json(users);
    });

    app.get("/entries/:id", async (req: Request, res: Response) => {
        const results = await entryRepository.findOne(req.params.id);
        return res.send(results);
    });


    app.post("/users", async (req: Request, res: Response) => {
        const user = await userRepository.create(req.body);
        const results = await userRepository.save(user);
        return res.send(results);
    });

    app.post("/entries", async (req: Request, res: Response) => {
        const user = await entryRepository.create(req.body);
        const results = await entryRepository.save(user);
        return res.send(results);
    });


    app.delete("/users/:id", async (req: Request, res: Response) => {
        const results = await userRepository.delete(req.params.id);
        return res.send(results);
    });

    app.delete("/entries/:id", async (req: Request, res: Response) => {
        const results = await entryRepository.delete(req.params.id);
        return res.send(results);
    });

    app.get("/users/logout", async (req: Request, res: Response) => {
        req.session.destroy(err => {
            res.status(400).json(err)
        })
        res.send({message: "Success"})
    });

    app.get("/users/login", async (req: Request, res: Response) => {
        req.session.destroy(err => {
            res.status(400).json(err)
        })
        res.send({message: "Success"})
    });
});
