require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();

// --- Middleware ---
// Enable Cross-Origin Resource Sharing
app.use(cors());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// --- Routes ---
app.get('/', (req, res) => {
  res.send('Welcome to the Akshararambh Public School API!');
});

// TODO: Add other routes for users, admissions, etc.

// --- Server Initialization ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
