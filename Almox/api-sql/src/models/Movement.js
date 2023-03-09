const Sequelize = require("sequelize")
const db = require("../db")

const Movement = db.define('movement', {
    _id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    },
    operation: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mili: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    remark: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
    }
})

module.exports = Movement