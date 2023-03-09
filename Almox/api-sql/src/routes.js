const express = require("express")
const routes = express.Router()

const User = require("./models/User")
const UserController = require("./controllers/UserController")

const Material = require("./models/Material")
const MaterialController = require("./controllers/MaterialController")

const Movement = require("./models/Movement")
const MovementController = require("./controllers/MovementController")

const AuthMiddleware = require("./middlewares/AuthMiddleware")

const LoginController = require("./controllers/LoginController")
const AuthController = require("./controllers/AuthController")

routes.get("/", (request, response) => response.send("Hello, World!"))

routes.post("/login", LoginController.check)

routes.get("/users", AuthMiddleware.checkToken, UserController.index)
routes.post("/users", AuthMiddleware.checkToken, UserController.store)

routes.get("/materials", AuthMiddleware.checkToken, MaterialController.index)

routes.get("/movements", AuthMiddleware.checkToken, MovementController.index)

routes.get("/auth", AuthController.verify)

User.sync()
Material.sync()
Movement.sync()

module.exports = routes