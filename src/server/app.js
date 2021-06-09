const express = require('express')
const cors = require('cors')
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
    tasks[id] = req.body.text
    res.json(tasks)
})

app.put('/item/:id', (req, res) => {
    tasks[req.params.id] = req.body.text
    res.json(tasks)
})

app.delete('/item/:id', (req, res) => {
    delete tasks[req.params.id]
    res.json(tasks)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${ port }`)
})