const Sequelize = require("sequelize")
const db = require("../db")

const User = db.define('user', {
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
    admin: {
        type: Sequelize.INTEGER,
        defaultValue: 4,
        allowNull: true,
        foreignKey: true        
    },
    adjunct: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
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
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
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