"use strict";
exports.__esModule = true;
//import { db } from "./src/db/setup"
var common_1 = require("./src/core/common");
var methods_1 = require("./src/db/methods");
var models_1 = require("./src/db/models");
var bodyParser = require("body-parser");
var cookieParser = require("body-parser");
var config = require("./config.json");
var supported = require('./data/routes.json');
var express = require('express');
common_1.app.use(bodyParser.urlencoded({ extended: true }));
common_1.app.use(bodyParser.json());
common_1.app.listen(config.app.port, function () { return console.log("Listening on port " + config.app.port); });
common_1.app.get('/', function (req, res) {
    res.send(supported);
});
var users = {};
var entries = {};
for (var i in supported) {
    if (i == "meta")
        continue;
    users[i] = supported[i]['user'];
    entries[i] = supported[i]['entry'];
}
common_1.app.get('/users/', function (req, res) {
    res.send(users);
});
common_1.app.get('/entries/', function (req, res) {
    res.send(entries);
});
common_1.app.get('/users/byid/', function (req, res) {
    methods_1.findUserById(req.body.id).then(function (v) {
        if (v == null)
            res.status(404).send({ error: "User Not Found" });
        else
            res.send(v);
    }, function (r) {
        res.status(400).send(r);
    });
});
common_1.app.get('/entries/byid/', function (req, res) {
    methods_1.findEntryById(req.body.id).then(function (v) {
        if (v == null)
            res.status(404).send({ error: "Entry Not Found" });
        else
            res.send(v);
    }, function (r) {
        res.status(400).send(r);
    });
});
common_1.app.post('/user/create/', function (req, res) {
    console.log(req.body);
    models_1.User.findOrCreate({ where: { username: req.body.username,
            password: req.body.password,
            email: req.body.email } }).then(function (_a) {
        var user = _a[0], created = _a[1];
        console.log(created, user);
        if (created)
            res.send(user.password);
        else
            res.send(403).send({ error: "User already exists" });
    }, function (r) {
        console.log(r);
        res.status(400).send(r);
    });
});
