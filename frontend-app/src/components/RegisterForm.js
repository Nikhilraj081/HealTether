import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from '../reducers/authReducer.js';
import { Link } from 'react-router-dom'; // Import Link for navigation

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    if (!email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { email, password });
      const { token } = response.data;
        alert("user register successfully")
      localStorage.setItem('token', token);
      dispatch(setUser({ token }));

      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setErrorMessage('');
    } catch (err) {
      console.error('Registration error:', err);
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-form">
      <h2 className="auth-form-title">Register</h2>

      <form onSubmit={handleRegister} className="auth-form-body">
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

        <div className="auth-form-input">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>

        {errorMessage && <div className="auth-error-message">{errorMessage}</div>}

        <button type="submit" className="auth-form-button">Register</button>

        <div className="auth-form-footer">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
