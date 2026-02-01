const BookingService = require("../service/booking");
const {GET_DB} = require("../config/DB")
async function createBooking(req, res) {
  try {
    const booking = await BookingService.createBooking(req.body);

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    // Trùng lịch
    if (error.code === "BOOKING_CONFLICT") {
      return res.status(409).json({
        error: {
          message: error.message,
          code: error.code,
        },
      });
    }

    res.status(400).json({
      error: {
        message: error.message,
        code: "INVALID_DATA",
      },
    });
  }
}

async function getBookings(req, res) {
  try {
    const { userId } = req.query;
    const bookings = await BookingService.getBookings(userId);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const getAllBooking   = async (req,res )=> { 
    try {
    const db = GET_DB();
    const booking = await db.collection("booking").find({}).toArray();

    // res.status(200).json(users);
    console.log(booking)
    res.render("getAllBooking.ejs", {listbookings :booking})
  } catch (error) {
    res.status(500).json({
      message: "Error getting users",
      error: error.message,
    });
  }
    
}

module.exports = {
  createBooking,
  getBookings,
  getAllBooking
};
