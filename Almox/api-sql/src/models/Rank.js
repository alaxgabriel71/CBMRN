const Sequelize = require("sequelize")
const db = require("../db")

const Rank = db.define('rank', {
    _id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    rank: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Rank