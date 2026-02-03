// src/components/PatientRegistration.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PatientRegistration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: '',
    reason: '',
    doctorId: ''
  });
  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Fetch doctors from the backend when the component loads
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors", error);
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!formData.doctorId) {
      setMessage('Please select a doctor.');
      return;
    }
    try {
      await axios.post('http://localhost:3001/api/patients/add', formData);
      setMessage('Registration successful! You can now log in.');
      setTimeout(() => {
        navigate('/patient-login'); // Redirect to login page after 2 seconds
      }, 2000);
    } catch (error) {
      setMessage('Registration failed. The email might already be in use.');
      console.error('Registration error', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Patient Registration</h2>
      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} required />
        <textarea name="reason" placeholder="Reason for Admission" onChange={handleChange} required />
        <select name="doctorId" onChange={handleChange} required value={formData.doctorId}>
          <option value="" disabled>-- Select a Doctor --</option>
          {doctors.map(doctor => (
            <option key={doctor.doctor_id} value={doctor.doctor_id}>
              Dr. {doctor.first_name} {doctor.last_name} ({doctor.specialty})
            </option>
          ))}
        </select>
        <button type="submit">Register</button>
      </form>
      {message && <p className={message.includes('successful') ? 'success' : 'error'}>{message}</p>}
    </div>
  );
}

export default PatientRegistration;