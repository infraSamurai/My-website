require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const admissionRoutes = require('./routes/admissionsRoutes');
const emailRoutes = require('./routes/emailRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// --- Middleware ---
// Enable Cross-Origin Resource Sharing
let allowedOrigins = process.env.CORS_ORIGIN;
if (allowedOrigins) {
  allowedOrigins = allowedOrigins.split(',').map(origin => origin.trim());
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins && allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true
}));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// --- Routes ---
app.get('/', (req, res) => {
  res.send('Welcome to the Akshararambh Public School API!');
});

// Authentication routes
// app.use('/api/auth', authRoutes);

// Student routes
app.use('/api/students', studentRoutes);

// Admission routes
app.use('/api/admissions', admissionRoutes);

// Email routes
app.use('/api', emailRoutes);

// Admin routes
app.use('/api/admin', adminRoutes);

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

console.log('🔧 BACKEND ENV CHECK:');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? '[SET]' : '[NOT SET]');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '[SET]' : '[NOT SET]');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '[SET]' : '[NOT SET]');
console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN ? '[SET]' : '[NOT SET]');
console.log('PORT:', process.env.PORT ? process.env.PORT : '[NOT SET]');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL ? process.env.FRONTEND_URL : '[NOT SET]');

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
