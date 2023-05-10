const Sequelize = require("sequelize")
const db = require("../db")

const Knowledge = db.define('knowledge', {
    _id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    from: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    },
    to: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    },
    subject: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    content: {
        type: Sequelize.JSON,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "Pendente"
    }
})

module.exports = Knowledge