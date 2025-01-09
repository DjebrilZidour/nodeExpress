//revising code 
const express = require("express");
const controllers = require("../controllers/book");

const bookRouter = express.Router();

bookRouter.post("/book", controllers.createBookController)
bookRouter.get("/book", controllers.getBookController)
app.get('/users', controllers.usersController);
bookRouter.delete("/book", controllers.deleteBookController)


module.exports = bookRouter;