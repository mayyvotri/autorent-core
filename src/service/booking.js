const BookingModel = require("../models/bookingmodel");

/**
 * Kiểm tra trùng thời gian
 */
function isOverlapping(start1, end1, start2, end2) {
  return new Date(start1) < new Date(end2) && new Date(start2) < new Date(end1);
}

/**
 * Tạo booking mới
 */
function createBooking(data) {
  const { carId, userId, startDate, endDate, pricePerDay } = data;

  if (!carId) throw new Error("carId is required");
  if (!userId) throw new Error("userId is required");

  if (new Date(endDate) <= new Date(startDate)) {
    throw new Error("endDate must be after startDate");
  }

  const bookings = BookingModel.getAllBookings();

  const conflict = bookings.some(
    (b) =>
      b.carId === carId &&
      isOverlapping(b.startDate, b.endDate, startDate, endDate),
  );

  if (conflict) {
    throw new Error("Booking time conflict");
  }

  const days =
    (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);

  const totalPrice = days * pricePerDay;

  const newBooking = {
    id: Date.now().toString(),
    carId,
    userId,
    startDate,
    endDate,
    totalPrice,
    status: "CONFIRMED",
  };

  BookingModel.saveBooking(newBooking);
  return newBooking;
}

/**
 * Lấy booking (theo user nếu có)
 */
function getBookings(userId) {
  const bookings = BookingModel.getAllBookings();

  if (!userId) return bookings;

  return bookings.filter((b) => b.userId === userId);
}

module.exports = {
  createBooking,
  getBookings,
};
