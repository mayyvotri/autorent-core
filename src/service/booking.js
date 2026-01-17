const fs = require("fs");
const path = require("path");
const { calculateRentalCost } = require("./pricing");
const { isOverlapping } = require("./availability");

const dataPath = path.join(__dirname, "../data/bookings.json");

function getAllBookings() {
  return JSON.parse(fs.readFileSync(dataPath, "utf8"));
}

function saveBookings(bookings) {
  fs.writeFileSync(dataPath, JSON.stringify(bookings, null, 2));
}

function createBooking(data) {
  const bookings = getAllBookings();

  if (isOverlapping(bookings, data.startDate, data.endDate)) {
    throw new Error("BOOKING_CONFLICT");
  }

  const totalCost = calculateRentalCost(
    data.startDate,
    data.endDate,
    data.pricePerDay,
  );

  const newBooking = {
    id: Date.now().toString(),
    ...data,
    totalCost,
  };

  bookings.push(newBooking);
  saveBookings(bookings);

  return newBooking;
}

module.exports = {
  getAllBookings,
  createBooking,
};
