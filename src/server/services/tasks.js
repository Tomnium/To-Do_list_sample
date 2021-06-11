const { Task } = require('../db/models')

const getList = async () => {
    const tasks = await Task.findAll()
    const parsedTasks = tasks.reduce((prev, result) => {
        prev[result.serverId] = result.text
        return prev
    }, {})
    return Promise.resolve(parsedTasks)
}

const addItem = async (id, item) => {
    return Task.create({ serverId: id, text: item })
}

const updateItem = async (id, newText) => {
    return Task.update({ text: newText }, { where: { serverId: id } })
}

const deleteItem = async (id) => {
    return Task.destroy({ where: { serverId: id } })
}

module.exports = {
    getList,
    addItem,
    updateItem,
    deleteItem
}