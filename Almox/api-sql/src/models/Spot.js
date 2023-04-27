const Sequelize = require("sequelize")
const db = require("../db")

const Spot = db.define('spot', {
    _id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Spot