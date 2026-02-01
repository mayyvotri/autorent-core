require("dotenv").config();
const express = require("express");
const {getHomePage} = require("./controller/homecontroller")
const carrouter = require("./routes/carrouter");
const bookingrouter = require("./routes/bookingrouter");
const configViewEngine = require("./config/viewEngine");
const app = express();
// connect DB
const { CONNECT_DB, GET_DB } = require("./config/DB");
(async () => {
  await CONNECT_DB();
})();

//   Middleware parse JSON
app.use(express.json());
// Middleware parse HTML form (EJS POST)
app.use(express.urlencoded({ extended: true }));
// config viewengine
configViewEngine(app);
//  Health check

app.get("/", getHomePage )
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
