const { DataTypes } = require('sequelize')
const db = require('../')

const usersModel = db.sequelize.define('UsersModel', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: DataTypes.STRING 
})

usersModel.sync()

module.exports = usersModel