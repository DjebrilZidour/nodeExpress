// import express from "express";
const express = require("express"); // Express js => framework nodeJs
const fileSystem = require("fs");
const bodyParser = require("body-parser");

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

app.post("/register", (request, response) => {
  const body = request.body;
  let dataBase = null;
  try {
    dataBase = fileSystem.readFileSync("./database.json", "utf-8");
  } catch (err) {
    console.log(err);
  }
  const data = dataBase ? JSON.parse(dataBase) : [];
  data.push(body);
  fileSystem.writeFileSync("database.json", JSON.stringify(data));
  response.status(200).json({ message: "Account saved" });
});

app.post("/login", (request, response) => {
  const body = request.body;

  const isUserExist = searchForUserWithEmail(body.email);
  if (!isUserExist) {
    return response.status(404).json({ message: "sorry this email doesn't exist" });
  }
  response.status(200).json({ message: "waiting for next step" });
});

const searchForUserWithEmail = (incomingEmail) => {
  let dataBase = null;
  try {
    dataBase = fileSystem.readFileSync("./database.json", "utf-8");
  } catch (err) {
    console.log(err);
  }
  const data = dataBase ? JSON.parse(dataBase) : [];
  const isUserExist = data.find((user) => {
    return user.email === incomingEmail;
  });

  return isUserExist;
};

app.listen(3000, () => {
  console.log("SERVER STARTED");
});
