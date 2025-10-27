import Booking from '../models/Booking.js';
import Flight from '../models/Flight.js';

export const createBooking = async (req, res) => {
    try {
        const { user, flightId, seatsBooked } = req.body;

        // Find flight
        const flight = await Flight.findById(flightId);
        if (!flight) return res.status(404).json({ message: 'Flight not found' });

        if (seatsBooked > flight.seatsAvailable)
            return res.status(400).json({ message: 'Not enough seats available' });

        const totalPrice = seatsBooked * flight.price;

        // Create booking
        const booking = await Booking.create({
            user,
            flight: flightId,
            seatsBooked,
            totalPrice,
        });

        // Update available seats
        flight.seatsAvailable -= seatsBooked;
        await flight.save();

        res.status(201).json({ message: 'Booking successful', booking });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.params.userId }).populate('flight');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
