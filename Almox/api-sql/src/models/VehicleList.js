const Sequelize = require("sequelize")
const db = require("../db")

const VehicleList = db.define('vehicle_list', {
    _id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    vehicle: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    },
    list: {
        type: Sequelize.JSON,
        allowNull: false
    }
})

module.exports = VehicleList