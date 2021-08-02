const express = require('express')
const router = express.Router()
const Joi = require('joi')
const {
    getFullList,
    addTask,
    updateTask,
    deleteTask
} = require('../controllers/tasks')

const {  validateMiddleware } = require('../middlewares/validate')

const schema = Joi.object({
    text: Joi.string().min(3).required(),
}).unknown()

router.get('/list',  getFullList)
router.post('/item', validateMiddleware(schema, "body"), addTask)
router.put('/item', validateMiddleware(schema, "body"), updateTask)
router.delete('/item', deleteTask)

module.exports = router
