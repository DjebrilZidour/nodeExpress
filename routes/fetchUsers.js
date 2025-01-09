//revising code 
const express = require("express");
const controllers = require("../controllers/user");

// Create a router instance
const fetchUsersRouter = express.Router();

// Define the '/users' route on the router instance
fetchUsersRouter.get('/users', controllers.fetchUsersController);

// Export the router
module.exports = fetchUsersRouter;
