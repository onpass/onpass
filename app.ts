//import { db } from "./src/db/setup"
import {app} from "./src/core/common"
import {findUserById, findUserByName, findEntriesByUser, findEntriesByUrl, addUser, addEntry, findEntryById} from "./src/db/methods"
import { User } from "./src/db/models"
const bodyParser = require("body-parser")
const cookieParser = require("body-parser")
const config = require("./config.json")
const supported = require('./data/routes.json')
const express = require('express')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(config.app.port, () => console.log(`Listening on port ${config.app.port}`))

app.get('/', (req, res) => {
    res.send(supported)
})

let users = {}
let entries = {}

for(let i in supported){
    if(i == "meta") continue
    users[i] = supported[i]['user']
    entries[i] = supported[i]['entry']
}

app.get('/users/', (req, res) => {
    res.send(users)
})

app.get('/entries/', (req, res) => {
    res.send(entries)
})

app.get('/users/byid/', (req, res) => {
    findUserById(req.body.id).then(v => {
        if(v == null) res.status(404).send({error: "User Not Found"})
        else res.send(v)
    }, r => {
        res.status(400).send(r)
    })
})

app.get('/entries/byid/', (req, res) => {
    findEntryById(req.body.id).then(v => {
        if(v == null) res.status(404).send({error: "Entry Not Found"})
        else res.send(v)
    }, r => {
        res.status(400).send(r)
    })
})

app.post('/user/create/', (req, res) => {
    console.log(req.body)
    User.findOrCreate({where: {username: req.body.username,
                               password: req.body.password,
                               email: req.body.email}}).then(([user, created]) => {
        console.log(created, user)
        if(created) res.send(user.password)
        else res.send(403).send({error: "User already exists"})
    }, r => {
        console.log(r)
        res.status(400).send(r)
    })
})