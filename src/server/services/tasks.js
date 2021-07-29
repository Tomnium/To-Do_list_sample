const { Task } = require('../db/models')

const getList = async (userId) => {
    const tasks = await Task.findAll({where:{userId}})
    const parsedTasks = tasks.reduce((prev, result) => {
        prev[result.id] = result.text
        return prev
    }, {})
    return Promise.resolve(parsedTasks)
}

const addItem = async (userId, item) => {
    return Task.create({ text: item , userId})
}

const updateItem = async (id, newText) => {
    return Task.update({ text: newText }, { where: { id } })
}

const deleteItem = async (id) => {
    return Task.destroy({ where: { id } })
}

module.exports = {
    getList,
    addItem,
    updateItem,
    deleteItem
}