const express = require("express");
const controllers = require("../controllers/user");

const userRouter = express.Router();

userRouter.post("/register", controllers.signupController);
app.get('/users', controllers.usersController);




module.exports = userRouter;