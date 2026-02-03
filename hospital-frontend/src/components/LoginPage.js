import React, { useState } from 'react';
import axios from 'axios';
import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard';

function LoginPage({ userType }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = userType === 'Doctor' ? '/api/doctors/login' : '/api/patients/login';

    try {
      const response = await axios.post(`http://localhost:3001${endpoint}`, { email, password });
      setUserData(response.data);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  if (userData) {
    return userType === 'Doctor'
      ? <DoctorDashboard doctor={userData} />
      : <PatientDashboard patient={userData} />;
  }

  return (
    <div className="login-container">
      <h2>{userType} Login</h2>
      <form onSubmit={handleLogin}>
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
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default LoginPage;