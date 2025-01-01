import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from '../reducers/authReducer.js';
import { Link } from 'react-router-dom'; // Import Link for navigation

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token } = response.data;
      alert("Login successful")
      localStorage.setItem('token', token);
      dispatch(setUser({ token }));

      setEmail('');
      setPassword('');
      setErrorMessage('');
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="auth-form">
      <h2 className="auth-form-title">Login</h2>

      <form onSubmit={handleLogin} className="auth-form-body">
        <div className="auth-form-input">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="auth-form-input">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        {errorMessage && <div className="auth-error-message">{errorMessage}</div>}

        <button type="submit" className="auth-form-button">Login</button>

        <div className="auth-form-footer">
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
