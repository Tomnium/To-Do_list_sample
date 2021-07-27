const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const auth = require('./routes/auth')
const tasks = require('./routes/tasks')

const app = express()
const port = 8080

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    credentials: true
}))

app.use('/auth', auth)
app.use('/tasks', tasks)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${ port }`)
})
