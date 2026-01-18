require("dotenv").config();
const app = require("./app");

const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME || "localhost";
const { connectDB, GET_DB } = require("./config/DB");
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
