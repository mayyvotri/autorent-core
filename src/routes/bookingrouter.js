const express = require("express");
const router = express.Router();
const bookingService = require("../service/booking");

router.get("/", (req, res) => {
  const { userId } = req.query;
  let bookings = bookingService.getAllBookings();

  if (userId) {
    bookings = bookings.filter((b) => b.userId === userId);
  }

  res.json(bookings);
});

router.post("/", (req, res) => {
  try {
    const booking = bookingService.createBooking(req.body);
    res.status(201).json(booking);
  } catch (err) {
    if (err.message === "BOOKING_CONFLICT") {
      res.status(409).json({ error: "Booking overlaps" });
    } else {
      res.status(400).json({ error: err.message });
    }
  }
});

module.exports = router;
