const Sequelize = require("sequelize")
const db = require("../db")

const Vehicle = db.define('vehicle', {
    _id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    model: {
        type: Sequelize.STRING,
        allowNull: true
    },
    plate: {
        type: Sequelize.STRING,
        allowNull: true
    },
    seats: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    list: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: true,
    }
})

module.exports = Vehicle