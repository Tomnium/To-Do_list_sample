require('dotenv').config()

module.exports = {
  host: process.env.host,
  port: process.env.port,
  user: 'root',
  password: "root",
  database: "MySQL80",
  dialect: "mysql",
}