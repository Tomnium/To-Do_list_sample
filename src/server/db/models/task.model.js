const { DataTypes } = require('sequelize')
const db = require('../')

const tasksModel = db.sequelize.define('TasksModel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'UsersModels',
            key: 'id'
        }
    },
    text: DataTypes.STRING
})

tasksModel.sync()

module.exports = tasksModel