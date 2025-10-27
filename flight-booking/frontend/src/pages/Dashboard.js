import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.name}</h2>
      <p>You are successfully logged in!</p>

      <div className="dashboard-actions">
        <button onClick={() => navigate('/flights')}>Book a Flight</button>
        <button onClick={() => navigate('/mybookings')}>My Bookings</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
