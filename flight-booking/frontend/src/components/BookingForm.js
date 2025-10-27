import React, { useState } from 'react';
import { createBooking } from '../services/api';

const BookingForm = ({ flight }) => {
  const [seats, setSeats] = useState(1);

  const handleBooking = async (e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem('userId')) || 'replace-with-logged-in-user-id';

    try {
      const bookingData = {
        user: userId,
        flightId: flight._id,
        seatsBooked: seats
      };
      await createBooking(bookingData);
      alert('Booking successful');
    } catch (err) {
      alert(err.response.data.message || 'Booking failed');
    }
  };

  return (
    <form onSubmit={handleBooking}>
      <input
        type="number"
        min="1"
        max={flight.seatsAvailable}
        value={seats}
        onChange={e => setSeats(Number(e.target.value))}
      />
      <button type="submit">Confirm Booking</button>
    </form>
  );
};

export default BookingForm;
