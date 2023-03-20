const Sequelize = require("sequelize")
const db = require("../db")

const Vehicle = db.define('vehicle', {
    _id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    materials: {
        type: Sequelize.INTEGER,
        allowNull: true,
        foreignKey: true
    },
    plate: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports = Vehicle