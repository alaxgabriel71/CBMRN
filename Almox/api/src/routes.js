const express = require("express");
const routes = express.Router();

const MaterialController = require("./controllers/MaterialController");
const MaterialMiddleware = require("./middlewares/MaterialMiddleware");

const MilitaryController = require("./controllers/MilitaryController");
const MilitaryMiddleware = require("./middlewares/MilitaryMiddleware");

const MovementController = require("./controllers/MovementController");

const UserController = require("./controllers/UserController");

const LoginController = require("./controllers/LoginController");

routes.get("/", (request, response) => { response.send("Hello, World!") });
routes.get("/materials", MaterialController.index);
routes.post("/materials", MaterialController.store);
routes.put("/materials/:id", MaterialMiddleware.validateId, MaterialController.update);
routes.delete("/materials/:id", MaterialMiddleware.validateId, MaterialController.remove);

routes.get("/military", MilitaryController.show);
routes.post("/military", MilitaryController.store);
routes.put("/military/:id", MilitaryMiddleware.validateId, MilitaryController.update);
routes.delete("/military/:id", MilitaryMiddleware.validateId, MilitaryController.remove);

routes.get("/movements", MovementController.show);
routes.post("/movements", MovementController.store);
routes.delete("/movements", MovementController.removeAll);

routes.get("/users", UserController.show);
routes.post("/users", UserController.store);

routes.post("/login", LoginController.check);

module.exports = routes;