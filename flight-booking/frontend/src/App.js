import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import Flights from './pages/Flights';
import MyBookings from './pages/userBookings';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import PaymentPage from './pages/Payment';
import Dashboard from './pages/Dashboard';
import ForgotPassword from "./pages/ForgotPassword";
function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Router>
      <NavBar user={user} onLogout={logout} />
      
      <Routes>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* ✅ Public home page (landing) */}
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Home />}
        />

        {/* ✅ Register */}
        <Route path="/register" element={<Register />} />

        {/* ✅ Login */}
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />

        {/* ✅ Dashboard (protected) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ Flights (protected) */}
        <Route
          path="/flights"
          element={
            <ProtectedRoute user={user}>
              <Flights />
            </ProtectedRoute>
          }
        />

        {/* ✅ Payment (protected) */}
        <Route
          path="/payment/:flightId"
          element={
            <ProtectedRoute user={user}>
              <PaymentPage />
            </ProtectedRoute>
          }
        />

        {/* ✅ MyBookings (protected) */}
        <Route
          path="/mybookings"
          element={
            <ProtectedRoute user={user}>
              <MyBookings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
