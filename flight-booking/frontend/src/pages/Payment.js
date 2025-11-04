import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Payment.css";
import { AuthContext } from "../context/AuthContext";

const PaymentPage = () => {
  const { flightId } = useParams();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seats, setSeats] = useState(1);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  // ✅ Access logged-in user
  const { user } = useContext(AuthContext);

  // Fetch flight details
  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const res = await fetch(`https://flight-booking-backend-zm5y.onrender.com/api/flights/${flightId}`);
        const data = await res.json();
        setFlight(data);
      } catch (error) {
        console.error("Error fetching flight:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFlight();
  }, [flightId]);

  const handleProceedToPay = () => {
    if (!user) {
      alert("Please log in to proceed with payment.");
      navigate("/login");
      return;
    }
    setShowPaymentForm(true);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    const cardNumber = e.target.cardNumber.value.trim();
    const holderName = e.target.holderName.value.trim();
    const expiry = e.target.expiry.value.trim();
    const cvv = e.target.cvv.value.trim();

    // Simple validation
    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      alert("Enter a valid 16-digit card number");
      return;
    }
    if (!holderName) {
      alert("Enter card holder name");
      return;
    }
    if (!expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {

      alert("Enter expiry in MM/YY format");
      return;
    }
    if (cvv.length !== 3 || isNaN(cvv)) {
      alert("Enter valid 3-digit CVV");
      return;
    }

    setPaymentProcessing(true);

    // Simulate dummy payment delay
    setTimeout(() => {
      setPaymentSuccess(true);
      setPaymentProcessing(false);

      // ✅ Store booking info in user-specific key
      const booking = {
        id: Date.now(),
        flight,
        seats,
        total: flight.price * seats,
        date: new Date().toLocaleString(),
      };

      if (!user) {
        alert("User not found. Please log in again.");
        navigate("/login");
        return;
      }

      const key = `bookings_${user.email}`;
      const existingBookings = JSON.parse(localStorage.getItem(key)) || [];
      existingBookings.push(booking);
      localStorage.setItem(key, JSON.stringify(existingBookings));

      // Redirect to my bookings page
      setTimeout(() => navigate("/mybookings"), 2500);
    }, 2000);
  };

  if (loading) {
    return <div className="loading">Loading flight details...</div>;
  }

  if (paymentSuccess) {
    return (
      <div className="success-page">
        <div className="success-card">
          <h2 style={{ color: "black" }}>✅ Payment Successful!</h2>
          <p style={{ color: "black" }}>
            Your booking for <strong style={{ color: "black" }}>{flight.airline}</strong> ({flight.flightNumber}) is confirmed.
          </p>
          <p className="redirect-text">Redirecting to your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h1 className="payment-title">✈️ Flight Payment</h1>

        {flight ? (
          <>
            <div className="flight-details">
              <h2>
                {flight.airline} ({flight.flightNumber})
              </h2>
              <p>
                From: {flight.source} → To: {flight.destination}
              </p>
              <p>Departure: {flight.departureTime}</p>
              <p>Arrival: {flight.arrivalTime}</p>
              <h3 className="price">₹{flight.price * seats} to be paid</h3>
            </div>

            {!showPaymentForm ? (
              <>
                <div className="seat-section">
                  <label>Number of Seats</label>
                  <input
                    type="number"
                    min="1"
                    value={seats}
                    onChange={(e) => setSeats(e.target.value)}
                  />
                </div>

                <div className="total-section">
                  <h3 className="price">
                    Total: ₹{(flight.price * seats).toLocaleString()}
                  </h3>
                </div>

                <button onClick={handleProceedToPay} className="pay-btn">
                  Proceed to Pay
                </button>
              </>
            ) : (
              <form className="card-form" onSubmit={handlePaymentSubmit}>
                <h3>💳 Enter Card Details</h3>
                <label>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  maxLength="16"
                  required
                  disabled={paymentProcessing}
                />

                <label>Card Holder Name</label>
                <input
                  type="text"
                  name="holderName"
                  required
                  disabled={paymentProcessing}
                />

                <div className="card-row">
                  <div>
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      maxLength="5"
                      required
                      disabled={paymentProcessing}
                    />
                  </div>
                  <div>
                    <label>CVV</label>
                    <input
                      type="password"
                      name="cvv"
                      maxLength="3"
                      required
                      disabled={paymentProcessing}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="confirm-btn"
                  disabled={paymentProcessing}
                >
                  {paymentProcessing ? "Processing..." : "Confirm Payment"}
                </button>
              </form>
            )}
          </>
        ) : (
          <p className="notfound">Flight not found</p>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
