function calculateRentalCost(startDate, endDate, pricePerDay) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffTime = end - start;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (diffDays <= 0) {
    throw new Error("End date must be after start date");
  }

  const totalCost = diffDays * pricePerDay;

  return {
    days: diffDays,
    totalCost,
  };
}

module.exports = {
  calculateRentalCost,
};
