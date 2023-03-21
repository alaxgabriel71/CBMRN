const Sequelize = require("sequelize")
const db = require("../db")

const Function = db.define('function', {
    _id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Function