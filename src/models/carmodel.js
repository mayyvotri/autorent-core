const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/cars.json");

/**
 * Đọc toàn bộ xe
 */
function getAllCars() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

/**
 * Lấy xe theo ID
 */
function getCarById(id) {
  const cars = getAllCars();
  return cars.find((car) => car.id === id);
}

/**
 * Lưu toàn bộ danh sách xe
 */
function saveAllCars(cars) {
  fs.writeFileSync(filePath, JSON.stringify(cars, null, 2));
}

module.exports = {
  getAllCars,
  getCarById,
  saveAllCars,
};
