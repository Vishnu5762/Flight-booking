import React from 'react';

const FlightCard = ({ flight, onSelect }) => {
  return (
    <div 
      style={{
        border: '1px solid #ce0e0eff',
        padding: '1rem',
        marginBottom: '1rem',
        cursor: 'pointer',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: '8px',
        boxShadow: '2px 2px 6px rgba(0,0,0,0.1)',
      }}
      onClick={onSelect} // Call onSelect when clicked
    >
      <h4 >{flight.airline} - {flight.flightNumber}</h4>
      <p >From: {flight.source} To: {flight.destination}</p>
      <p >Departure: {new Date(flight.departureTime).toLocaleString()}</p>
      <p >Arrival: {new Date(flight.arrivalTime).toLocaleString()}</p>
      <p >Price: ₹{flight.price}</p>
      <p >Seats Available: {flight.seatsAvailable}</p>
    </div>
  );
};

export default FlightCard;
