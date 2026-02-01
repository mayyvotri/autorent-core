const express = require("express");
const router = express.Router();
const BookingController = require("../controller/bookingcontroller");

// UI: mở form tạo booking theo carId
router.get("/createbooking/:id", BookingController.renderCreateBookingPage);
// UI: submit form tạo booking
router.post("/createbooking/:id", BookingController.createBookingFromForm);

// API: Tạo booking (JSON)
router.post("/createBooking/:id", BookingController.createBooking);
// Lấy booking theo user
router.get("/", BookingController.getBookings);
router.get("/getAllBooking", BookingController.getAllBooking)

module.exports = router;
