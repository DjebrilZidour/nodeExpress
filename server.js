// import express from "express";
const express = require("express"); // Express js => framework nodeJs
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./routes/user")
const controllers = require("./controllers/user");
const moduleRouter = require("./routes/modules");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

// for express to understand request
app.use(bodyParser.json());

// / == localhost:3000/
app.get("/", (request, response) => {
  response.send("<h3> express js </h3>");
});


app.use(userRouter)

app.use(moduleRouter)



app.listen(3000, () => {
  console.log("SERVER STARTED");
});

// MVC == MODEL VIEW CONTROLLER
