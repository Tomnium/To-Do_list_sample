const express = require('express')
const cors = require('cors')
const { Sequelize, DataTypes } = require('sequelize');
const mysql = require('mysql2/promise')
const Joi = require('joi');
const dbConfig = require("./db.config.js");

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const { host, dbport, user, password, database, dialect } = dbConfig;
// const connection = await mysql.createConnection({ host, dbport, user, password });
// await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
const sequelize = new Sequelize(database, user, password, { dialect });

const tasksModel = sequelize.define('TasksModel', {
    serverId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    text: {
        type: DataTypes.STRING
    }
})

const tasks = {}

const schema = Joi
    .string()
    .required()
    .min(1)

const validate = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body.text)
    error ? res.status(400).send({ error: 'Invalid item' }) : next()
} 

app.get('/list', (req, res) => {
    res.json(tasks)
})

app.post('/item', validate(schema), (req, res) => {
    const id = Date.now()
    tasks[id] = req.body.text 
    res.json(tasks)
})

app.put('/item/:id', validate(schema), (req, res) => {
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