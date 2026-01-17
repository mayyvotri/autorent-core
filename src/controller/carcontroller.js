const CarService = require("../service/carservice");

function getCars(req, res) {
  const { status } = req.query;
  const cars = CarService.getCars(status);

  res.json(cars);
}

module.exports = {
  getCars,
};
