import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';  // Import Provider to wrap your app with the store
import store from './store';  // Import the Redux store
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import './styles/auth.css';  

const App = () => {
 
  return (
   
    <Provider store={store}>  
      <Router>
        <div className="app-container">
          {/* Set up routes */}
          <Routes>
            {/* Route for the login page */}
            <Route path="/login" element={<LoginForm />} />
            
            {/* Route for the register page */}
            <Route path="/register" element={<RegisterForm />} />
            
            {/* Add a default route or home page if needed */}
            <Route path="/" element={<h1>Welcome to Our App</h1>} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
