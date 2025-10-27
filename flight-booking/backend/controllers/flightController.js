import Flight from '../models/Flight.js';

// Get all flights (with optional query filters)
export const getFlights = async (req, res) => {
  try {
    const query = {};
    if (req.query.source) query.source = req.query.source;
    if (req.query.destination) query.destination = req.query.destination;

    const flights = await Flight.find(query);
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch flights', error: err.message });
  }
};

// Create a new flight
export const createFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(201).json({ message: 'Flight created successfully', flight });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create flight', error: err.message });
  }
};
