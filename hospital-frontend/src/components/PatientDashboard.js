import React from 'react';

function PatientDashboard({ patient }) {
  const doctorName = patient.doctor_first_name ? `${patient.doctor_first_name} ${patient.doctor_last_name}` : 'Not Assigned';

  return (
    <div className="dashboard">
      <h2>Patient Dashboard</h2>
      <p><strong>Name:</strong> {patient.first_name} {patient.last_name}</p>
      <p><strong>Age:</strong> {patient.age}</p>
      <p><strong>Reason for Admission:</strong> {patient.reason_for_admission}</p>
      <p><strong>Treating Doctor:</strong> Dr. {doctorName}</p>
    </div>
  );
}

export default PatientDashboard;