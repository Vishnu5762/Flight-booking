import React, { useState } from "react";
import "./Auth.css";
import {useNavigate} from "react-router-dom";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const navigate=useNavigate();
  const handleSendToken = async (e) => {
    e.preventDefault();
    const res = await fetch("https://flight-booking-backend-zm5y.onrender.com/api/users/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setMessage(data.message);
    if (res.ok) setStep(2);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://flight-booking-backend-zm5y.onrender.com/api/users/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert(data.message);
      navigate("/login"); // ✅ redirect to login after success
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 style={{color:"black"}}>🔐 Forgot Password</h2>

        {step === 1 ? (
          <form onSubmit={handleSendToken}>
            <label style={{color:"black"}}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{color:"black"}}
            />
            <button type="submit">Send Reset Token</button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <label style={{color:"black"}}>Reset Token</label>
            <input
              type="text"
              required
              value={token}
              onChange={(e) => setToken(e.target.value)}
              style={{color:"black"}}
            />

            <label style={{color:"black"}}>New Password</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{color:"black"}}
            />
            <button type="submit">Reset Password</button>
          </form>
        )}

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
