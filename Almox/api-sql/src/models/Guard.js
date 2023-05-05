const Sequelize = require("sequelize")
const db = require("../db")

const Guard = db.define('guard', {
    _id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    schedules: {
        type: Sequelize.JSON,
        allowNull: true
    }
})

module.exports = Guard