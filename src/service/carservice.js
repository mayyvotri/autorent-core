const CarModel = require("../models/carmodel");

async function getCars(status) {
  return await CarModel.getAllCars(status);
}

module.exports = {
  getCars,
};
