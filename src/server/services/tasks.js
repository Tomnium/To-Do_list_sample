const { Task } = require('../db/models')

const getList = async () => {
    const tasks = await Task.findAll()
    const parsedTasks = tasks.reduce((prev, result) => {
        prev[result.id] = result.text
        return prev
    }, {})
    return Promise.resolve(parsedTasks)
}

const addItem = async (id, item) => {
    return Task.create({ text: item , userId: 1})
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