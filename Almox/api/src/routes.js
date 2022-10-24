const express = require("express");
const routes = express.Router();

const MaterialController = require("./controllers/MaterialController");
const MaterialMiddleware = require("./middlewares/MaterialMiddleware.js");

routes.get("/", (request, response) => { response.send("Hello, World!") });
routes.get("/materials", MaterialController.index);
routes.post("/materials", MaterialController.store);
routes.put("/materials/:id", MaterialMiddleware.validateId, MaterialController.update);
routes.delete("/materials/:id", MaterialMiddleware.validateId, MaterialController.remove);

module.exports = routes;