export { db }

const config = require("../../config.json")
const postgres = config.postgres

import { Sequelize } from 'sequelize'

const db: Sequelize = new Sequelize('data', postgres.username, postgres.password, {
    host: `${postgres.url}:${postgres.port}`,
    dialect: 'postgres'
})

