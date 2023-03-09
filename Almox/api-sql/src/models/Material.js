const Sequelize = require("sequelize")
const db = require("../db")

const Material = db.define('material', {
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
    quantity: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        defaultValue: 1
    },
    remark: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
    }
})

module.exports = Material