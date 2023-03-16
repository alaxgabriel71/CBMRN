const Sequelize = require("sequelize")
const db = require("../db")

const Admin = db.define('admin', {
    _id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    level: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

module.exports = Admin