const { DataTypes } = require('sequelize')
const db = require('../')

const tokenModel = db.sequelize.define('TokenModel', {
    user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "UsersModels",
            key: 'id'
        }
    },
    refreshToken: DataTypes.STRING
})

tokenModel.sync()

module.exports = tokenModel