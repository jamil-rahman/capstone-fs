// Error handling first
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

// Imports
require('dotenv').config();
console.log('DOTENV LOADED:', process.env.PORT ? true : false);
const express = require('express');
const cors = require('cors');
const path = require('path');
const admin = require('firebase-admin');
const { connectDB } = require('./config/db.js');

// Route imports
const userRoutes = require('./routes/user-routes.js');
const postRoutes = require('./routes/post-routes');
const triviaRoutes = require('./routes/trivia-routes');
const insightsRoutes = require('./routes/insights-routes');
const emailRoutes = require('./routes/email-routes');

// Initialize Express
const app = express();

// Environment variables
const PORT = process.env.PORT || 5000;

// Initialize Firebase Admin
try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('Firebase Admin SDK initialized');
} catch (error) {
  console.error('Firebase initialization error:', error);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Database connection
connectDB().catch(err => {
  console.error('MongoDB connection error:', err);
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/trivia', triviaRoutes);
app.use('/api/insights', insightsRoutes);
app.use('/api/email', emailRoutes);

// Static files serving
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route for React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server with error handling
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (error) => {
  console.error('Server startup error:', error);
});