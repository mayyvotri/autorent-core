const fs = require("fs");
const path = require("path");
const { GET_DB } = require("../config/DB");

const filePath = path.join(__dirname, "../data/cars.json");

/**
 * Đọc toàn bộ xe
 */

async function getAllCars(status) {
  const db = GET_DB();
 
  const filter = status ? { status } : {};
  return db.collection("car").find(filter).toArray();
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
