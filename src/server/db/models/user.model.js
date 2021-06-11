const { DataTypes } = require('sequelize')
const db = require('../')

const usersModel = db.sequelize.define('UsersModel', {
    email: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    password: DataTypes.STRING
})

usersModel.sync()

module.exports = usersModel