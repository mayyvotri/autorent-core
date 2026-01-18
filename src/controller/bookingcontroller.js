const BookingService = require("../service/booking");

async function createBooking(req, res) {
  try {
    const booking = await BookingService.createBooking(req.body);

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    // Trùng lịch
    if (error.code === "BOOKING_CONFLICT") {
      return res.status(409).json({
        error: {
          message: error.message,
          code: error.code,
        },
      });
    }

    res.status(400).json({
      error: {
        message: error.message,
        code: "INVALID_DATA",
      },
    });
  }
}

async function getBookings(req, res) {
  try {
    const { userId } = req.query;
    const bookings = await BookingService.getBookings(userId);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createBooking,
  getBookings,
};
