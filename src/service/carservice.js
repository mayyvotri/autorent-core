const CarModel = require("../models/carmodel");

async function getCars(status) {
  const cars = CarModel.getAllCars();

  if (!status) return cars;

  return cars.filter((car) => car.status === status);
}

module.exports = {
  getCars,
};
