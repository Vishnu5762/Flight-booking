import axios from 'axios';

// Base URL for backend API
const API_URL = 'https://flight-booking-backend-zm5y.onrender.com';

// Get JWT token from localStorage and attach to headers
const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
  };
};

// ---------- 🧍 USER APIs ----------
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

// ---------- ✈️ FLIGHT APIs ----------
export const getFlights = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/api/flights`, {
      ...getAuthConfig(),
      params: query,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unable to fetch flights' };
  }
};

export const createFlight = async (flightData) => {
  try {
    const response = await axios.post(`${API_URL}/api/flights`, flightData, getAuthConfig());
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Flight creation failed' };
  }
};

// ---------- 🧾 BOOKING APIs ----------
export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${API_URL}/api/bookings`, bookingData, getAuthConfig());
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Booking failed' };
  }
};

export const getUserBookings = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/bookings/${userId}`, getAuthConfig());
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unable to fetch user bookings' };
  }
};
