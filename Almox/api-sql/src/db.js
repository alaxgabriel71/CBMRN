const Sequelize = require("sequelize")

const db_name = process.env.DB_NAME
const db_userName = process.env.DB_USERNAME
const db_password = process.env.DB_PASSWORD
const host = process.env.DB_HOST
const dialect = 'mysql'

const sequelize = new Sequelize(db_name, db_userName, db_password, {
    host,
    dialect
})

sequelize.authenticate()
    .then(() => console.log(`Connected with database!`))
    .catch(err => console.error(err))

module.exports = sequelize