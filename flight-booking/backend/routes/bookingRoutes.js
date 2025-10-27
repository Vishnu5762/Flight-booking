import express from "express";
import Booking from "../models/Booking.js";
import Flight from "../models/Flight.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// 🔐 Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // attach userId to request
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ✅ POST: Create new booking (only for logged-in users)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { flightId, seats } = req.body;
    const flight = await Flight.findById(flightId);

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    const total = flight.price * seats;

    const booking = new Booking({
      userId: req.userId, // ✅ take userId from verified token
      flightId,
      airline: flight.airline,
      flightNumber: flight.flightNumber,
      source: flight.source,
      destination: flight.destination,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      seats,
      total,
    });

    await booking.save();
    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET: Get bookings for the logged-in user only
router.get("/mybookings", verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
