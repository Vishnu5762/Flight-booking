import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Fly8Buddy ✈️</h1>
        <p>Book your flights easily and securely.</p>
        <Link to="/flights">
          <button className="home-button">View Flights</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
