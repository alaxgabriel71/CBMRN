const express = require("express");
const routes = express.Router();

const MaterialController = require("./controllers/MaterialController");
const MaterialMiddleware = require("./middlewares/MaterialMiddleware");

const MilitaryController = require("./controllers/MilitaryController");
const MilitaryMiddleware = require("./middlewares/MilitaryMiddleware");

const MovementController = require("./controllers/MovementController");

const UserController = require("./controllers/UserController");
const UserMiddleware = require("./middlewares/UserMiddleware");

const LoginController = require("./controllers/LoginController");

const AuthController = require("./controllers/AuthController");
const AuthMiddleware = require("./middlewares/AuthMiddleware");

routes.get("/", AuthMiddleware.checkToken, (request, response) => { response.send("Hello, World!") });
routes.get("/materials", AuthMiddleware.checkToken, MaterialController.index);
routes.post("/materials", AuthMiddleware.checkToken, MaterialController.store);
routes.put("/materials/:id", AuthMiddleware.checkToken, MaterialMiddleware.validateId, MaterialController.update);
routes.delete("/materials/:id", AuthMiddleware.checkToken, MaterialMiddleware.validateId, MaterialController.remove);

routes.get("/military", AuthMiddleware.checkToken, MilitaryController.show);
routes.post("/military", AuthMiddleware.checkToken, MilitaryController.store);
routes.put("/military/:id", AuthMiddleware.checkToken, MilitaryMiddleware.validateId, MilitaryController.update);
routes.delete("/military/:id", AuthMiddleware.checkToken, MilitaryMiddleware.validateId, MilitaryController.remove);

routes.get("/movements", AuthMiddleware.checkToken, MovementController.show);
routes.post("/movements", AuthMiddleware.checkToken, MovementController.store);
routes.delete("/movements", AuthMiddleware.checkToken, MovementController.removeAll);

routes.get("/auth", AuthController.verify);
routes.get("/users", AuthMiddleware.checkToken, UserController.show);
routes.post("/users", AuthMiddleware.checkToken, UserMiddleware.validateEmail, UserController.store);

routes.post("/login", LoginController.check);


module.exports = routes;