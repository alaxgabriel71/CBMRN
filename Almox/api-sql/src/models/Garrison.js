const Sequelize = require("sequelize")
const db = require("../db")

const Garrison = db.define('garrison', {
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
    composition: {
        type: Sequelize.JSON,
        allowNull: false
    },
    max: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    min: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Garrison