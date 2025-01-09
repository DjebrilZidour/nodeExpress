//revising code 
const express = require("express");
const controllers = require("../controllers/user");

const fetchUsersRouter = express.Router();


app.get('/users', controllers.fetchUsersController);


module.exports = fetchUsersRouter;