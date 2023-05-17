const Sequelize = require("sequelize")
const db = require("../db")

const VehicleChecklist = db.define('vehicle_checklist', {
    _id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    vehicle: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    },
    driver: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    remark: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
    }
})

module.exports = VehicleChecklist