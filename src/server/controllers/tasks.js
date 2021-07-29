const { v4: uuid } = require('uuid')

const {
    getList,
    addItem,
    updateItem,
    deleteItem
} = require('../services/tasks')

const creationDate = Date.now()

const sendList = async (res, id) => {
    const tasks = await getList(id)
    
    res.json(tasks)
}

const getFullList = async (req, res) => {
    const id = req.params.id
    await sendList(res, id)
}

const addTask = async (req, res) => {
    const { userId, text } = req.body
    await addItem(userId, text)
    await sendList(res, userId)
}

const updateTask = async (req, res) => {
    const {usr, id} = JSON.parse(req.params.data)
    const { text } = req.body
    await updateItem(id, text)
    await sendList(res, usr)
}

const deleteTask = async (req, res) => {
    const {usr, id} = JSON.parse(req.params.data)
    await deleteItem(id)
    await sendList(res, usr)
}

module.exports = {
    getFullList,
    addTask,
    updateTask,
    deleteTask
}