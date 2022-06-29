const {Router} = require('express')
const userRoutes = Router()
const {UserController} = require('../../controllers')

// userRoutes.get("/", UserController.index)
// userRoutes.post("/create", UserController.store)
// userRoutes.get("/show/:uuid", UserController.show)
userRoutes.get("/show", UserController.show)
userRoutes.post("/update", UserController.update)
// userRoutes.get("/delete/:uuid", UserController.destroy)


userRoutes.get("/testing", UserController.test)
// userRoutes.post("/testing", UserController.test)

module.exports = userRoutes;
