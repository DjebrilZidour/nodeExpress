// import express from "express";
const express = require("express");
const fileSystem = require("fs");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/", (request, response) => {
  response.send("<h3> express js </h3>");
});

app.get("/login", (request, response) => {
  response.send("<h3> login </h3>");
});

app.post("/register", (request, response) => {
  const body = request.body;
  let dataBase;
  try {
    dataBase = fileSystem.readFileSync("./database.json", "utf-8");
  } catch (err) {}
  const data = dataBase ? JSON.parse(dataBase) : [];
  data.push(body);

  fileSystem.writeFileSync("database.json", JSON.stringify(data));
  response.status(200).json({ message: "Account saved" });
});
app.post("/login", (request, response) => {
  const body = request.body;
  let dataBase;
  try {
    dataBase = fileSystem.readFileSync("./database.json", "utf-8");
  } catch (err) {}
  const data = dataBase ? JSON.parse(dataBase) : [];
  data.push(body);

  fileSystem.writeFileSync("database.json", JSON.stringify(data));
  response.status(200).json({ message: "Account saved" });
});

app.listen(3000, () => {
  console.log("SERVER STARTED");
});
