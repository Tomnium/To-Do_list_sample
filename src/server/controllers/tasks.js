const {
    getList,
    addItem,
    updateItem,
    deleteItem
} = require('../services/tasks')

const sendList = async (res, id) => {
    const tasks = await getList(id)
    res.json(tasks)
}

const getFullList = async (req, res) => {
    // const id = req.params.id
    const { id } = req.query
    await sendList(res, id)
}

const addTask = async (req, res) => {
    const { userId, text } = req.body
    await addItem(userId, text)
    await sendList(res, userId)
}

const updateTask = async (req, res) => {
    // const {userId, taskId} = JSON.parse(req.params.data)
    const {userId, taskId} = req.query
    const { text } = req.body
    await updateItem(taskId, text)
    await sendList(res, userId)
}

const deleteTask = async (req, res) => {
    const {userId, taskId} = req.query
    await deleteItem(taskId)
    await sendList(res, userId)  
}

module.exports = {
    getFullList,
    addTask,
    updateTask,
    deleteTask
}