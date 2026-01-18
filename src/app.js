require("dotenv").config();
const express = require("express");

const carrouter = require("./routes/carrouter");
const bookingrouter = require("./routes/bookingrouter");

const app = express();
// connect DB
const { CONNECT_DB, GET_DB } = require("./config/DB");
CONNECT_DB();

//   Middleware parse JSON

app.use(express.json());

//  Health check

app.get("/", (req, res) => {
  res.json({ message: "AutoRent API is running" });
});

//   Routes

app.use("/cars", carrouter);
app.use("/bookings", bookingrouter);

app.use((req, res) => {
  res.status(404).json({
    error: {
      message: "API not found",
      code: "NOT_FOUND",
    },
  });
});

module.exports = app;
