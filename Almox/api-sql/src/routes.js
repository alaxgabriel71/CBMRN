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

const Vehicle = require("./models/Vehicle")
const VehicleController = require("./controllers/VehicleController")

const Garrison = require("./models/Garrison")
const GarrisonController = require("./controllers/GarrisonController")

const Function = require("./models/Function")
const FunctionController = require("./controllers/FunctionController")

const VehicleMaterialsListController = require("./controllers/VehicleMaterialsListController")
const VehicleMaterialsList = require("./models/VehicleMaterialsList")

const GarrisonOfDay = require("./models/GarrisonOfDay")
const GarrisonOfDayController = require("./controllers/GarrisonOfDayController")

const Spot = require("./models/Spot")
const SpotController = require("./controllers/SpotController")

const Cleaning = require("./models/Cleaning")
const CleaningController = require("./controllers/CleaningController")

const Guard = require("./models/Guard")
const GuardController = require("./controllers/GuardController")

const Notification = require("./models/Notification")
const NotificationController = require("./controllers/NotificationController")

const Knowledge = require("./models/Knowledge")
const KnowledgeController = require("./controllers/KnowledgeController")

const VehicleChecklist = require("./models/VehicleChecklist")
const VehicleChecklistController = require("./controllers/VehicleChecklistController")


User.sync()
// User.sync({ alter: true })
Material.sync()
Movement.sync()
// Movement.sync({ force: true})
Admin.sync()
//Admin.sync({ force: true })
Rank.sync()
Vehicle.sync(/* { force: true } */)
Garrison.sync(/* { alter: true } */)
Function.sync()
VehicleMaterialsList.sync(/* { alter: true } */)
GarrisonOfDay.sync()
Spot.sync()
Cleaning.sync()
Guard.sync()
Notification.sync()
Knowledge.sync()
VehicleChecklist.sync()

routes.get("/", (request, response) => response.send("Hello, World!"))

routes.post("/login", LoginController.check)

routes.get("/users", AuthMiddleware.checkToken, UserController.index)
routes.post("/users", AuthMiddleware.checkToken, UserController.store)
routes.delete("/users/:id", AuthMiddleware.checkToken, UserController.remove)
routes.put("/users/admin-level/:id", AuthMiddleware.checkToken, UserController.updateAdminLevel)
routes.put("/users/rank/:id", AuthMiddleware.checkToken, UserController.updateRank)
routes.put("/users/active/:id", AuthMiddleware.checkToken, UserController.updateActive)
routes.put("/users/adjunct/:id", AuthMiddleware.checkToken, UserController.adjunct)
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

routes.get("/vehicles", AuthMiddleware.checkToken, VehicleController.index)
routes.get("/vehicle/:id", AuthMiddleware.checkToken, VehicleController.getOne)
routes.post("/vehicles", AuthMiddleware.checkToken, VehicleController.store)
routes.put("/vehicle/:id", AuthMiddleware.checkToken, VehicleController.update)
routes.put("/vehicle/materials-list/:id", AuthMiddleware.checkToken, VehicleController.updateList)
routes.delete("/vehicle/:id", AuthMiddleware.checkToken, VehicleController.remove)

routes.get("/garrisons", AuthMiddleware.checkToken, GarrisonController.index)
routes.get("/garrison/:id", AuthMiddleware.checkToken, GarrisonController.getOne)
routes.post("/garrisons", AuthMiddleware.checkToken, GarrisonController.store)
routes.put("/garrison/:id", AuthMiddleware.checkToken, GarrisonController.update)
routes.delete("/garrison/:id", AuthMiddleware.checkToken, GarrisonController.remove)

routes.get("/functions", AuthMiddleware.checkToken, FunctionController.index)
routes.post("/functions", AuthMiddleware.checkToken, FunctionController.store)

routes.get("/vehicles-materials-lists", AuthMiddleware.checkToken, VehicleMaterialsListController.index)
routes.get("/vehicle-materials-list/:id", AuthMiddleware.checkToken, VehicleMaterialsListController.getOne)
routes.post("/vehicles-materials-lists", AuthMiddleware.checkToken, VehicleMaterialsListController.store)
routes.put("/vehicles-materials-list/:id", AuthMiddleware.checkToken, VehicleMaterialsListController.updateOne)
routes.put("/vehicles-materials-list/:id/insert-new-material", AuthMiddleware.checkToken, VehicleMaterialsListController.insertOneMaterial)
routes.delete("/vehicles-materials-list/:id", AuthMiddleware.checkToken, VehicleMaterialsListController.remove)

routes.get("/garrisons-of-day", AuthMiddleware.checkToken, GarrisonOfDayController.index)
routes.post("/garrisons-of-day", AuthMiddleware.checkToken, GarrisonOfDayController.store)
routes.put("/garrisons-of-day/:id", AuthMiddleware.checkToken, GarrisonOfDayController.update)

routes.get("/spots", AuthMiddleware.checkToken, SpotController.index)
routes.post("/spots", AuthMiddleware.checkToken, SpotController.store)
routes.put("/spots/:id", AuthMiddleware.checkToken, SpotController.update)
routes.delete("/spots/:id", AuthMiddleware.checkToken, SpotController.remove)

routes.get("/cleanings", AuthMiddleware.checkToken, CleaningController.index)
routes.post("/cleanings", AuthMiddleware.checkToken, CleaningController.store)
routes.put("/cleanings/:id", AuthMiddleware.checkToken, CleaningController.update)
routes.delete("/cleaning/:id", AuthMiddleware.checkToken, CleaningController.remove)

routes.get("/guards", AuthMiddleware.checkToken, GuardController.index)
routes.post("/guards", AuthMiddleware.checkToken, GuardController.store)
routes.put("/guards/:id", AuthMiddleware.checkToken, GuardController.update)
routes.delete("/guards/:id", AuthMiddleware.checkToken, GuardController.remove)

routes.get("/notifications/:id", AuthMiddleware.checkToken, NotificationController.show)
routes.post("/notifications", AuthMiddleware.checkToken, NotificationController.store)
routes.delete("/notifications/:id", AuthMiddleware.checkToken, NotificationController.remove)
routes.put("/notifications/:id", AuthMiddleware.checkToken, NotificationController.update)

routes.get("/knowledges", AuthMiddleware.checkToken, KnowledgeController.index)
routes.post("/knowledges", AuthMiddleware.checkToken, KnowledgeController.store)
routes.put("/knowledges/:id", AuthMiddleware.checkToken, KnowledgeController.update)

routes.get("/vehicle-checklists", AuthMiddleware.checkToken, VehicleChecklistController.index)
routes.post("/vehicle-checklists", AuthMiddleware.checkToken, VehicleChecklistController.store)

routes.get("/auth", AuthController.verify)

module.exports = routes