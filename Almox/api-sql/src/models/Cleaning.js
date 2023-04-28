const Sequelize = require("sequelize")
const db = require("../db")

const Cleaning = db.define('cleaning', {
    _id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    spot: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    },
    composition: {
        type: Sequelize.JSON,
        allowNull: false
    }
})

module.exports = Cleaning