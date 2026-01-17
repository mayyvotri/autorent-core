const express = require("express");
const router = express.Router();
const { getCars } = require("../controller/carcontroller");

const cars = [
  { id: "1", name: "Toyota", status: "AVAILABLE" },
  { id: "2", name: "Honda", status: "RENTED" },
];

router.get("/", getCars);

module.exports = router;
