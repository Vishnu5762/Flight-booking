import express from 'express';
import Flight from '../models/Flight.js';

const router = express.Router();

// ✅ Fetch all flights or filter by source/destination
router.get('/', async (req, res) => {
  try {
    const { source, destination } = req.query;
    const query = {};

    if (source) query.source = { $regex: new RegExp(source, 'i') };
    if (destination) query.destination = { $regex: new RegExp(destination, 'i') };

    console.log('Query used:', query);

    const flights = await Flight.find(query);
    console.log('Flights found:', flights.length);
    console.log('Sample flight:', flights[0]); // 👀 show one document

    res.json(flights);
  } catch (err) {
    console.error('Error fetching flights:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.json(flight);
  } catch (err) {
    console.error('Error fetching flight by ID:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});
export default router;