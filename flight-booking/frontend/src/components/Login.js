import React, { useState, useContext } from 'react';
import { loginUser } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
//import './Login.css'; // optional for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Trim inputs to avoid spaces
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();

      // Call login API
      const { user, token } = await loginUser({
        email: trimmedEmail,
        password: trimmedPassword,
      });

      if (user && token) {
        login(user, token); // Save user and token in context/localStorage
        navigate('/home'); // Redirect after login
      } else {
        alert('Login Failed: Invalid response from server');
        console.error('Invalid login response:', { user, token });
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Login Failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Your Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <div className="login-options" >
        <Link to="/forgot-password" className="forgot-password" style={{color:'white'}}>
          Forgot Password?
        </Link>
        <p>
          Not a user?{' '}
          <Link to="/register" className="register-link" style={{color:'white'}}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
