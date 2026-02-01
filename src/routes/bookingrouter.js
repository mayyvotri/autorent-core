const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const BookingController = require("../controller/bookingcontroller");

// Tạo booking
router.post("/createBooking/:id", BookingController.createBooking);
router.get("./createbooking",)
// Lấy booking theo user
router.get("/", BookingController.getBookings);
router.get("/getAllBooking", BookingController.getAllBooking)

module.exports = router;
