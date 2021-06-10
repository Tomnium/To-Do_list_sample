const express = require('express')
const cors = require('cors')
const Joi = require('joi')
const db = require('./db')

const app = express()
const port = 8080
const creationDate = Date.now()
const tasksModel = db.initModel()
const schema = Joi
    .string()
    .required()
    .min(1)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const validate = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body.text)
    error ? res.status(400).send({ error: 'Invalid item' }) : next()
}

const sendList = (res) => {
    return (async () => {
        const tasks = await db.getList(tasksModel)
        res.json(tasks)
    })()
}

app.get('/list', (req, res) => {
    (async () => await sendList(res))()
})

app.post('/item', validate(schema), (req, res) => {
    (async () => {
        const id = Date.now() - creationDate
        await db.addItem(tasksModel, id, req.body.text)
        await sendList(res)
    })()
})

app.put('/item/:id', validate(schema), (req, res) => {
    (async () => {
        await db.updateItem(tasksModel, req.params.id, req.body.text)
        await sendList(res)
    })()
})

app.delete('/item/:id', (req, res) => {
    (async () => {
        await db.deleteItem(tasksModel, req.params.id)
        await sendList(res)
    })()
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${ port }`)
})