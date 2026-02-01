const express = require("express");
const router = express.Router();
const {getCars} = require('../controller/carcontroller'); 
router.get("/", getCars);


module.exports = router;
