const Sequelize = require("sequelize")
const db = require("../db")

const User = db.define('user', {
    _id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    admin: {
        type: Sequelize.INTEGER,
        defaultValue: 4,
        allowNull: true,
        foreignKey: true        
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    seniority: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    rank: {
        type: Sequelize.STRING,
        allowNull: false
    },
    qra: {
        type: Sequelize.STRING,
        allowNull: false
    },
    registration: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = User