const express = require("express");
const controllers = require("../controllers/book");

const bookRouter = express.Router();

bookRouter.post("/createbook", controllers.createBookController)


module.exports = bookRouter;