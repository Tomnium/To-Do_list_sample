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
    tasks[id] = req.body
    res.send(`added item, length: ${ Object.keys(tasks).length }, body: ${ JSON.stringify(req.body)}`)
})

app.put('/item/:id', (req, res) => {
    tasks[req.params.id] = req.body
    res.send('set item')
})

app.delete('/item/:id', (req, res) => {
    delete tasks[req.params.id]
    res.send('removed item')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})