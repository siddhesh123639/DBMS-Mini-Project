// server.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

// --- API Endpoints ---

// Doctor Login
app.post('/api/doctors/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM Doctors WHERE email = ?';

    db.query(query, [email], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).send('Invalid credentials');
        }

        const doctor = results[0];
        // Note: For a real app, use bcrypt.compare to check passwords
        // For this example, we'll do a simple check.
        // const passwordIsValid = bcrypt.compareSync(password, doctor.password_hash);
        if (password !== doctor.password_hash) { // Replace with actual hash comparison
             return res.status(401).send('Invalid credentials');
        }
        res.json(doctor);
    });
});

// Patient Login
app.post('/api/patients/login', (req, res) => {
    const { email, password } = req.body;
    // Query to get patient and their doctor's name using a JOIN
    const query = `
        SELECT p.*, d.first_name AS doctor_first_name, d.last_name AS doctor_last_name
        FROM Patients p
        LEFT JOIN Doctors d ON p.doctor_id = d.doctor_id
        WHERE p.email = ?`;

    db.query(query, [email], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).send('Invalid credentials');
        }

        const patient = results[0];
        if (password !== patient.password_hash) { // Replace with actual hash comparison
            return res.status(401).send('Invalid credentials');
        }
        res.json(patient);
    });
});

// Add a new Patient
app.post('/api/patients/add', (req, res) => {
    const { firstName, lastName, email, password, age, reason, doctorId } = req.body;
    const query = `INSERT INTO Patients (first_name, last_name, email, password_hash, age, reason_for_admission, doctor_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [firstName, lastName, email, password, age, reason, doctorId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error adding patient');
        }
        res.status(201).send({ message: 'Patient added successfully!', patientId: result.insertId });
    });
});


app.get('/api/doctors', (req, res) => {
    const query = 'SELECT doctor_id, first_name, last_name, specialty FROM Doctors';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching doctors');
        }
        res.json(results);
    });
});


app.get('/api/doctors/:id/patients', (req, res) => {
    const doctorId = req.params.id;
    const query = 'SELECT * FROM Patients WHERE doctor_id = ?';

    db.query(query, [doctorId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching patients');
        }
        res.json(results);
    });
});

app.delete('/api/patients/:id', (req, res) => {
    const patientId = req.params.id;
    const query = 'DELETE FROM Patients WHERE patient_id = ?';

    db.query(query, [patientId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting patient');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Patient not found');
        }
        res.status(200).send({ message: 'Patient deleted successfully' });
    });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});