require("dotenv").config();
const express = require("express");
const app = express();

const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME || "localhost";

app.listen(port, hostname, () => {
  app.render("chạy chương trình thành công");
  console.log(`Server running at http://${hostname}:${port}`);
});
