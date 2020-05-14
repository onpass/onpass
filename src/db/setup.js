"use strict";
exports.__esModule = true;
var config = require("../../config.json");
var postgres = config.postgres;
var sequelize_1 = require("sequelize");
var db = new sequelize_1.Sequelize('data', postgres.username, postgres.password, {
    host: postgres.url + ":" + postgres.port,
    dialect: 'postgres'
});
exports.db = db;
