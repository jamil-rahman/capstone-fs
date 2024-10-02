require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/db.js');
const { initializeApp, cert } = require('firebase-admin/app'); // Firebase Admin SDK for initialization
const firebaseAdmin = require('firebase-admin'); // Firebase Admin CommonJS import
const userRoutes = require('./routes/user-routes.js');
const serviceAccount = require('./config/serviceAccountKey.json'); // Load service account JSON


// Define port from environment variables or fallback to 5000
const PORT = process.env.PORT || 5000;

// Initialize Firebase Admin SDK using service account credentials
initializeApp({
  credential: cert(serviceAccount),
});

const app = express();

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
connectDB();

// Define routes for user authentication and other user-related routes
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
