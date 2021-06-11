const { DataTypes } = require('sequelize')
const db = require('../')

const tasksModel = db.sequelize.define('TasksModel', {
    serverId: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    text: DataTypes.STRING
})

tasksModel.sync()

module.exports = tasksModel