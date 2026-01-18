const BookingModel = require("../models/bookingmodel");

/**
 * Tạo booking mới (MongoDB)
 */
async function createBooking(data) {
  const { carId, userId, startDate, endDate, pricePerDay } = data;

  if (!carId) throw new Error("carId is required");
  if (!userId) throw new Error("userId is required");

  if (new Date(endDate) <= new Date(startDate)) {
    throw new Error("endDate must be after startDate");
  }

  // 1️⃣ CHECK TRÙNG LỊCH TRONG DB
  const conflict = await BookingModel.checkConflict(carId, startDate, endDate);

  if (conflict) {
    throw new Error("Booking time conflict");
  }

  // 2️⃣ TÍNH GIÁ
  const days =
    (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);

  const totalPrice = days * pricePerDay;

  // 3️⃣ LƯU BOOKING
  const newBooking = {
    carId,
    userId,
    startDate,
    endDate,
    totalPrice,
    status: "CONFIRMED",
    createdAt: new Date(),
  };

  return await BookingModel.createBooking(newBooking);
}

module.exports = {
  createBooking,
};
