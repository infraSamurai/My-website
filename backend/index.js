require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const admissionRoutes = require('./routes/admissionsRoutes');
const emailRoutes = require('./routes/emailRoutes');

const app = express();

// --- Middleware ---
// Enable Cross-Origin Resource Sharing
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  origin: 'https://my-website-1-yu72.onrender.com'
}));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// --- Routes ---
app.get('/', (req, res) => {
  res.send('Welcome to the Akshararambh Public School API!');
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Student routes
app.use('/api/students', studentRoutes);

// Admission routes
app.use('/api/admissions', admissionRoutes);

// Email routes
app.use('/api', emailRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// --- Server Initialization ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
