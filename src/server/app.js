const express = require('express')
const cors = require('cors')
const Joi = require('joi');
const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const tasks = {}

app.get('/list', (req, res) => {
    res.json(tasks)
})

app.post('/item', (req, res) => {
    const id = Date.now()
    const { error, value } = Joi.string().required().min(1).validate(req.body.text)
    if (!error) {
        tasks[id] = value 
        res.json(tasks)
    } else {
        res.status(500).send({ error: 'Invalid item' })
    }
})

app.put('/item/:id', (req, res) => {
    const { error, value } = Joi.string().required().min(1).validate(req.body.text)
    if (!error) {
        tasks[req.params.id] = value 
        res.json(tasks)
    } else {
        res.status(500).send({ error: 'Invalid item' })
    }
})

app.delete('/item/:id', (req, res) => {
    delete tasks[req.params.id]
    res.json(tasks)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${ port }`)
})