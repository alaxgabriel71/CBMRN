const Sequelize = require("sequelize")
const db = require("../db")

const GarrisonOfDay = db.define('garrisons_of_day', {
    _id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    composition: {
        type: Sequelize.JSON,
        allowNull: false
    },
    vehicle: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: false
    }
})

module.exports = GarrisonOfDay