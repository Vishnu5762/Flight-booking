import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: "Flight", required: true },
  airline: String,
  flightNumber: String,
  source: String,
  destination: String,
  departureTime: String,
  arrivalTime: String,
  seats: { type: Number, default: 1 },
  total: Number,
  date: { type: Date, default: Date.now }
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
