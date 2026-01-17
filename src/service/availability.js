function isOverlapping(existingBookings, newStartDate, newEndDate) {
  const newStart = new Date(newStartDate);
  const newEnd = new Date(newEndDate);

  for (let booking of existingBookings) {
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);

    // Điều kiện trùng lịch
    if (newStart < end && newEnd > start) {
      return true;
    }
  }

  return false;
}

module.exports = {
  isOverlapping,
};
