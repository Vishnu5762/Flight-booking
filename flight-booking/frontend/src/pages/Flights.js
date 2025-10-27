import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import FlightCard from '../components/FlightCard';
import { useNavigate } from 'react-router-dom';

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const navigate = useNavigate();

  const fetchFlights = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to view flights');
        window.location.href = '/login';
        return;
      }

      const res = await axios.get('http://localhost:5000/api/flights', {
        headers: { Authorization: `Bearer ${token}` },
        params: { source: from, destination: to },
      });

      setFlights(res.data);
    } catch (err) {
      console.error('❌ Error fetching flights:', err);
      alert('Failed to fetch flights. Please check backend or login again.');
    }
  }, [from, to]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFlights();
  };

  // ✅ Redirect to payment page when flight selected
  const handleSelectFlight = (flightId) => {
    navigate(`/payment/${flightId}`);
  };

  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>✈️ Search Flights</h2>

      <form onSubmit={handleSearch} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          style={{
            marginRight: '0.5rem',
            padding: '0.5rem',
            borderRadius: '6px',
            border: '1px solid #ccc',
          }}
        />
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          style={{
            marginRight: '0.5rem',
            padding: '0.5rem',
            borderRadius: '6px',
            border: '1px solid #ccc',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </form>

      {/* Display flight list */}
      <div>
        {flights.length > 0 ? (
          flights.map((flight) => (
            <FlightCard
              key={flight._id}
              flight={flight}
              onSelect={() => handleSelectFlight(flight._id)}
            />
          ))
        ) : (
          <p>No flights found</p>
        )}
      </div>
    </div>
  );
};

export default Flights;
