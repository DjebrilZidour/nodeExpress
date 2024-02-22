const express = require("express");
const controllers = require("../controllers/user");

const userRouter = express.Router();

userRouter.post("/register", controllers.signupController);

userRouter.post("/login", controllers.loginController);

module.exports = userRouter;