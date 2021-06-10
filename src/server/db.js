const { Sequelize, DataTypes } = require('sequelize')
const dbConfig = require("./db.config.js")

module.exports.initModel = () => {
    const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, { dialect: dbConfig.dialect })
    
    const tasksModel = sequelize.define('TasksModel', {
        serverId: {
            type: DataTypes.BIGINT,
            primaryKey: true
        },
        text: DataTypes.STRING
    })

    tasksModel.sync()
    return tasksModel
}

module.exports.getList = async (model) => {
    const queryResult = await model.findAll()
    const tasks = queryResult.reduce((prev, result) => {
        prev[result.serverId] = result.text
        return prev
    }, {})
    return Promise.resolve(tasks)
}

module.exports.addItem = async (model, id, item) => {
    return model.create({ serverId: id, text: item })
}

module.exports.updateItem = async (model, id, newText) => {
    return model.update({ text: newText }, { where: { serverId: id } })
}

module.exports.deleteItem = (model, id) => {
    return model.destroy({ where: { serverId: id } })
}