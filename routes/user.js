const express = require("express");
const controllers = require("../controllers/user");

const userRouter = express.Router();

userRouter.post("/register", controllers.signupController);




module.exports = userRouter;