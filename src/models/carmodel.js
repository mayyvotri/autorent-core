const fs = require("fs");
const path = require("path");
const { GET_DB } = require("../config/DB");
const { ObjectId } = require("mongodb");

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
async function getCarById(id) {
  const db = GET_DB();

  // Try string id first
  let car = await db.collection("car").findOne({ id });
  if (car) return car;

  // Fallback: numeric id
  const numericId = Number(id);
  if (!Number.isNaN(numericId)) {
    car = await db.collection("car").findOne({ id: numericId });
    if (car) return car;
  }

  // Fallback: Mongo ObjectId stored in _id
  if (ObjectId.isValid(id)) {
    try {
      car = await db.collection("car").findOne({ _id: new ObjectId(id) });
      if (car) return car;
    } catch (_) {
      // ignore
    }
  }

  return null;
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
