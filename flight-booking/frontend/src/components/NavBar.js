import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./NavBar.css";

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav>
      <div className="nav-header">
        <div className="nav-title">
          ✈️ Fly8Buddy
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <div className="nav-left">
          <Link to="/dashboard">Home</Link>
          <Link to="/flights">Flights</Link>
          <Link to="/mybookings">My Bookings</Link>
        </div>

        <div className="nav-right">
          {user ? (
            <>
              <span>Welcome, {user.name}</span>
              <button onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
