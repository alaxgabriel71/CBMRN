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

const Admin = require("./models/Admin")
const AdminController = require("./controllers/AdminController")

const Rank = require("./models/Rank")
const RankController = require("./controllers/RankController")


User.sync()
//User.sync({ alter: true })
Material.sync()
Movement.sync()
// Movement.sync({ force: true})
Admin.sync()
//Admin.sync({ force: true })
Rank.sync()

routes.get("/", (request, response) => response.send("Hello, World!"))

routes.post("/login", LoginController.check)

routes.get("/users", AuthMiddleware.checkToken, UserController.index)
routes.post("/users", AuthMiddleware.checkToken, UserController.store)
routes.put("/users/admin-level/:id", AuthMiddleware.checkToken, UserController.updateAdminLevel)
routes.put("/users/rank/:id", AuthMiddleware.checkToken, UserController.updateRank)
routes.get("/users-name", AuthMiddleware.checkToken, UserController.show)

routes.get("/admin", AuthMiddleware.checkToken, AdminController.index)
routes.post("/admin", AuthMiddleware.checkToken, AdminController.store)

routes.get("/ranks", AuthMiddleware.checkToken, RankController.index)
routes.post("/ranks", AuthMiddleware.checkToken, RankController.store)

routes.get("/materials", AuthMiddleware.checkToken, MaterialController.index)
routes.post("/materials", AuthMiddleware.checkToken, MaterialController.store)
routes.put("/materials/:id", AuthMiddleware.checkToken, MaterialController.update)
routes.delete("/materials/:id", AuthMiddleware.checkToken, MaterialController.remove)

routes.get("/movements", AuthMiddleware.checkToken, MovementController.index)
routes.post("/movements", AuthMiddleware.checkToken, MovementController.store)
routes.delete("/movements", AuthMiddleware.checkToken, MovementController.desroy)


routes.get("/auth", AuthController.verify)

module.exports = routes