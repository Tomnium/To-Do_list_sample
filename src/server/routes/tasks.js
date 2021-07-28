const express = require('express')
const { auth } = require('../middlewares/auth');
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

router.get('/list', auth, getFullList)
router.post('/item', validate(schema), addTask)
router.put('/item/:id', validate(schema), updateTask)
router.delete('/item/:id', deleteTask)

module.exports = router
