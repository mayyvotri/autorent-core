const CarService = require("../service/carservice");

async function getCars(req, res) {
  try {
    const { status } = req.query;
    const cars = await CarService.getCars(status);

    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getCars,
};
