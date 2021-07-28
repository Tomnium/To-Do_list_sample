const { v4: uuid } = require('uuid')

const {
    getList,
    addItem,
    updateItem,
    deleteItem
} = require('../services/tasks')

const creationDate = Date.now()

const sendList = async (res) => {
    const tasks = await getList()
    res.json(tasks)
}

const getFullList = async (req, res) => {
    await sendList(res)
}

const addTask = async (req, res) => {
    const { text } = req.body
    const id = Date.now() - creationDate
    await addItem(id, text)
    await sendList(res)
}

const updateTask = async (req, res) => {
    const id = req.params.id
    const { text } = req.body
    await updateItem(id, text)
    await sendList(res)
}

const deleteTask = async (req, res) => {
    const id = req.params.id
    await deleteItem(id)
    await sendList(res)
}

module.exports = {
    getFullList,
    addTask,
    updateTask,
    deleteTask
}