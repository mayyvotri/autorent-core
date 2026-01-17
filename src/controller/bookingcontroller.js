const BookingService = require("../service/booking");

function createBooking(req, res) {
  try {
    const booking = BookingService.createBooking(req.body);
    res.status(201).json(booking);
  } catch (error) {
    // Chuẩn hóa lỗi API
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

function getBookings(req, res) {
  const { userId } = req.query;
  const bookings = BookingService.getBookings(userId);
  res.json(bookings);
}

module.exports = {
  createBooking,
  getBookings,
};
