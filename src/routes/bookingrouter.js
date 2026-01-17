const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const BookingController = require("../controller/bookingcontroller");

// Tạo booking
router.post("/", authMiddleware, BookingController.createBooking);

// Lấy booking theo user
router.get("/", BookingController.getBookings);

module.exports = router;
