// src/components/DoctorDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DoctorDashboard({ doctor }) {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');

  // Fetch the doctor's patients when the component loads
  useEffect(() => {
    const fetchPatients = async () => {
      if (!doctor.doctor_id) return;
      try {
        const response = await axios.get(`http://localhost:3001/api/doctors/${doctor.doctor_id}/patients`);
        setPatients(response.data);
      } catch (err) {
        setError('Could not fetch patient data.');
        console.error("Error fetching patients", err);
      }
    };
    fetchPatients();
  }, [doctor.doctor_id]); // Re-run if the doctor ID changes

  // Function to handle patient deletion
  const handleDeletePatient = async (patientId) => {
    // Confirm before deleting
    if (!window.confirm("Are you sure you want to delete this patient record?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3001/api/patients/${patientId}`);
      // Update the UI by removing the deleted patient from the list
      setPatients(patients.filter(p => p.patient_id !== patientId));
    } catch (err) {
      setError('Failed to delete patient.');
      console.error("Error deleting patient", err);
    }
  };

  return (
    <div className="dashboard">
      <h2>Doctor Dashboard</h2>
      <div className="doctor-info">
        <p><strong>Name:</strong> Dr. {doctor.first_name} {doctor.last_name}</p>
        <p><strong>ID:</strong> {doctor.doctor_id}</p>
        <p><strong>Specialty:</strong> {doctor.specialty}</p>
        <p><strong>Years of Experience:</strong> {doctor.years_of_experience}</p>
      </div>

      <div className="patient-list-container">
        <h3>Assigned Patients</h3>
        {error && <p className="error">{error}</p>}
        {patients.length > 0 ? (
          patients.map(patient => (
            <div key={patient.patient_id} className="patient-card">
              <div className="patient-info">
                <strong>{patient.first_name} {patient.last_name}</strong> (Age: {patient.age})
                <small>Reason: {patient.reason_for_admission}</small>
              </div>
              <button
                onClick={() => handleDeletePatient(patient.patient_id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No patients are currently assigned to you.</p>
        )}
      </div>
    </div>
  );
}

export default DoctorDashboard;