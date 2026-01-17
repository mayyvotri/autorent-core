require("dotenv").config();
const express = require("express");
const app = express();
const carrouter = require("./routes/carrouter");
const bookingrouter = require("./routes/bookingrouter");
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "AutoRent API is running" });
});

app.use("/cars", carrouter);
app.use("/bookings", bookingrouter);

const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME || "localhost";

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
