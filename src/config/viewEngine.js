const express = require("express");
const path = require("path");
require("dotenv").config();

const configViewEngine = (app) => {
  app.set("views", path.join("./src", "views"));
  app.set("view engine", "ejs");
  app.use(express.static(path.join(__dirname, "public")));
};
module.exports = configViewEngine;
