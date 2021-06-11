const express = require('express')
const cors = require('cors')

const auth = require('./routes/auth')
const tasks = require('./routes/tasks')

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/auth', auth)
app.use('/tasks', tasks)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${ port }`)
})