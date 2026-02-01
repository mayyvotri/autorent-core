const { getAllCars } = require("../models/carmodel");
const CarService = require("../service/carservice");

async function getCars(req, res) {
  try {
    const { status } = req.query;
    const cars = await CarService.getCars(status);

    // res.status(200).json(cars);
    res.render("getAllCar.ejs",{listcars:cars})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getCars
  
};
