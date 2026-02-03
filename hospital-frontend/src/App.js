import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import PatientRegistration from './components/PatientRegistration'; // <-- IMPORT THE NEW COMPONENT
import './App.css';

function Home() {
  return (
    <div className="home-container">
      <h2>Welcome to the Hospital Management System</h2>
      <nav>
        <Link to="/doctor-login" className="login-link">Doctor Login</Link>
        <Link to="/patient-login" className="login-link">Patient Login</Link>
        {/* --- ADD THIS NEW LINK --- */}
        <Link to="/register" className="login-link secondary">Register as Patient</Link>
      </nav>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctor-login" element={<LoginPage userType="Doctor" />} />
          <Route path="/patient-login" element={<LoginPage userType="Patient" />} />
          {/* --- ADD THIS NEW ROUTE --- */}
          <Route path="/register" element={<PatientRegistration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;