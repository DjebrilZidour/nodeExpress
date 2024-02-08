// import express from "express";
const express = require("express"); // Express js => framework nodeJs
const fileSystem = require("fs");
const bodyParser = require("body-parser");
const controllers = require("./controllers/user");

const app = express();

// for express to understand request
app.use(bodyParser.json());

// / == localhost:3000/
app.get("/", (request, response) => {
  response.send("<h3> express js </h3>");
});

app.get("/login", (request, response) => {
  response.send("<h3> login </h3>");
});

app.post("/register", controllers.signupController);

app.post("/login", controllers.loginController);



app.listen(3000, () => {
  console.log("SERVER STARTED");
});

// MVC == MODEL VIEW CONTROLLER
