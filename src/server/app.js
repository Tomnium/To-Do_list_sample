const express = require('express')
const cors = require('cors')
const Joi = require('joi')
const db = require('./db')

const app = express()
const port = 8080
const creationDate = Date.now()
const tasksModel = db.initTasksModel()
const usersModel = db.initUsersModel()
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

app.post('/sign-up', (req, res) => {
    (async () => {
        try {
            await db.createUser(usersModel, req.body.email, req.body.password)
            res.status(200).json({
                didLogIn: true,
                loggedInUser: req.body.email
            })
        } catch {
            res.status(400).json({ didLogIn: false, error: 'User already exists' })
        }
    })()
})

app.post('/log-in', (req, res) => {
    (async () => {
        try {
            const user = await db.logIn(usersModel, req.body.email, req.body.password)
            if (user !== null)
                res.status(200).json({ didLogIn: true, loggedInUser: req.body.email })
            else
                throw new Error()
        } catch {
            res.status(404).json({ didLogIn: false, error: 'User not found' })
        }
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