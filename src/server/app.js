const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const auth = require('./routes/auth')
const tasks = require('./routes/tasks')

const {authMiddleware} = require('./middlewares/auth')

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(cookieParser())

app.use('/auth', auth)
app.use('/tasks', authMiddleware, tasks)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${ port }`)
})
