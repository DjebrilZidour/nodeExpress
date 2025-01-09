//revising code 
const express = require("express");
const controllers = require("../controllers/user");

const fetchUsersRouter = express.Router();


app.get('/users', controllers.usersController);


module.exports = fetchUsersRouter;