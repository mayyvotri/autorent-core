function validateBooking(booking) {
  const { carId, startDate, endDate } = booking;

  if (!carId) {
    throw new Error("carId is required");
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (end <= start) {
    throw new Error("endDate must be after startDate");
  }

  return true;
}

module.exports = {
  validateBooking,
};
