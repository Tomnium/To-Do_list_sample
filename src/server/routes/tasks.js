const express = require('express')
const router = express.Router()
const Joi = require('joi')
const {
    getFullList,
    addTask,
    updateTask,
    deleteTask
} = require('../controllers/tasks')
const { validate } = require('../middlewares/validate')

const schema = Joi
    .string()
    .required()
    .min(1)

router.get('/list/:id',  getFullList)
router.post('/item', validate(schema), addTask)
router.put('/item/:data', validate(schema), updateTask)
router.delete('/item/:data', deleteTask)

module.exports = router
