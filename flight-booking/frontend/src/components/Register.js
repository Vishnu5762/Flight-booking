import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password });
      alert('Registration successful');
      navigate("/login");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Registration failed. Please try again.";
      alert(errorMsg);
    }
  };

  return (
    <div className="login-container">
      <h2>Account Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
            
      <p style={{text-align:center}}>Note: At the first hit server takes time to wakeup and process request kindly wait for 30-50 seconds</p>
    </div>
  );
};

export default Register;
