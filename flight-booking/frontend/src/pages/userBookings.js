import React, { useEffect, useState, useContext } from "react";
import "./MyBookings.css";
import { AuthContext } from "../context/AuthContext";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;

    // Use a unique key for each user's bookings
    const userBookings = JSON.parse(localStorage.getItem(`bookings_${user.email}`)) || [];
    setBookings(userBookings);
  }, [user]);

  return (
    <div className="bookings-container">
      <h1>🧾 My Bookings</h1>
      {!user ? (
        <p>Please log in to view your bookings.</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found for your account.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((b) => (
            <div key={b.id} className="booking-card">
              <h3 >
                {b.flight.airline} ({b.flight.flightNumber})
              </h3>
              <p style={{ color: "black",fontWeight:"bold" }}>
                {b.flight.source} → {b.flight.destination}
              </p>
              <p style={{ color: "black",fontWeight:"bold" }}>Seats: {b.seats}</p>
              <p style={{ color: "black",fontWeight:"bold" }}>Total Paid: ₹{b.total.toLocaleString()}</p>
              <p style={{ color: "black",fontWeight:"bold" }}>Date: {b.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
