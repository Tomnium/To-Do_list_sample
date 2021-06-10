const { Sequelize, DataTypes } = require('sequelize')
const dbConfig = require("./db.config.js")

exports.initTasksModel = () => {
    const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, { dialect: dbConfig.dialect })
    
    const tasksModel = sequelize.define('TasksModel', {
        serverId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        text: DataTypes.STRING
    })

    tasksModel.sync()
    return tasksModel
}

exports.initUsersModel = () => {
    const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, { dialect: dbConfig.dialect })
    
    const usersModel = sequelize.define('UsersModel', {
        email: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        password: DataTypes.STRING
    })

    usersModel.sync()
    return usersModel
}

exports.getList = async (model) => {
    const queryResult = await model.findAll()
    const tasks = queryResult.reduce((prev, result) => {
        prev[result.serverId] = result.text
        return prev
    }, {})
    return Promise.resolve(tasks)
}

exports.addItem = async (model, id, item) => {
    return model.create({ serverId: id, text: item })
}

exports.updateItem = async (model, id, newText) => {
    return model.update({ text: newText }, { where: { serverId: id } })
}

exports.deleteItem = async (model, id) => {
    return model.destroy({ where: { serverId: id } })
}

exports.createUser = async (model, email, password) => {
    const user = await model.findOne({ where: { email } })
    return user === null ? model.create({ email, password }) : Promise.reject(new Error("Already exists"))
}

exports.logIn = async (model, email, password) => {
    return model.findOne({ where: { email, password } })
}