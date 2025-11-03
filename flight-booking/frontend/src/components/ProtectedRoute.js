import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext); 

    if (loading) {
        // 🟢 2. Show a placeholder while checking localStorage
        return <div>Loading user session...</div>; 
    }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
