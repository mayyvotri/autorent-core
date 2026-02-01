const BookingService = require("../service/booking");
const {GET_DB} = require("../config/DB")
const CarModel = require("../models/carmodel");

async function renderCreateBookingPage(req, res) {
  try {
    const carId = req.params.id;
    const car = await CarModel.getCarById(carId);

    if (!car) {
      return res.status(404).send("Car not found");
    }

    return res.render("createNewOrder.ejs", { car, error: null, form: {} });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function createBookingFromForm(req, res) {
  try {
    const carId = req.params.id;
    const { userId, startDate, endDate } = req.body;
    const car = await CarModel.getCarById(carId);

    if (!car) {
      return res.status(404).send("Car not found");
    }

    // Ensure we always trust pricePerDay from DB
    const pricePerDay = car.pricePerDay;

    await BookingService.createBooking({
      carId,
      userId,
      startDate,
      endDate,
      pricePerDay,
    });

    return res.redirect("/bookings/getAllBooking");
  } catch (error) {
    if (error.code === "BOOKING_CONFLICT" || error.message === "Booking time conflict") {
      // Re-render form with error message
      const carId = req.params.id;
      const car = await CarModel.getCarById(carId);
      return res.status(409).render("createNewOrder.ejs", {
        car,
        error: error.message,
        form: req.body || {},
      });
    }

    const carId = req.params.id;
    const car = await CarModel.getCarById(carId);
    return res.status(400).render("createNewOrder.ejs", {
      car,
      error: error.message,
      form: req.body || {},
    });
  }
}

async function createBooking(req, res) {
  try {
    const carIdFromParams = req.params?.id;
    const payload = { ...req.body };
    if (carIdFromParams && !payload.carId) payload.carId = carIdFromParams;

    // If pricePerDay missing, fetch from DB
    if (payload.carId && !payload.pricePerDay) {
      const car = await CarModel.getCarById(payload.carId);
      if (car?.pricePerDay != null) payload.pricePerDay = car.pricePerDay;
    }

    const booking = await BookingService.createBooking(payload);

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
  renderCreateBookingPage,
  createBookingFromForm,
  createBooking,
  getBookings,
  getAllBooking
};
