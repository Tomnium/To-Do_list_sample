const { Sequelize } = require('sequelize')
const dbConfig = require("./db.config.js")

const sequelize = new Sequelize(
    dbConfig.database, 
    dbConfig.user, 
    dbConfig.password, 
    { dialect: dbConfig.dialect }
)

module.exports = { sequelize }