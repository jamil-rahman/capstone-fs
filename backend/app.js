require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db.js');
const { cert } = require('firebase-admin/app'); // Firebase Admin SDK for initialization
const admin = require('firebase-admin'); // Firebase Admin CommonJS import
const userRoutes = require('./routes/user-routes.js');
const postRoutes = require('./routes/post-routes');
const triviaRoutes = require('./routes/trivia-routes');
const insightsRoutes = require('./routes/insights-routes');
const path = require('path');

const serviceAccount = require('./config/serviceAccountKey.json'); // Load service account JSON


// Define port from environment variables or fallback to 5000
const PORT = process.env.PORT || 5000;

// Initialize Firebase Admin SDK using service account credentials
admin.initializeApp({
  credential: cert(serviceAccount),
});

admin.auth().listUsers(1)
  .then((listUsersResult) => {
    console.log('Firebase Admin initialized successfully');
  })
  .catch((error) => {
    console.log('Firebase Admin initialization error:', error);
  });




const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // My Vite frontend URL
  credentials: true
}));


// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
connectDB();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
app.use(express.static(path.join(__dirname, "../frontend/dist")));


// Routes for my endpoints
app.use('/api/users', userRoutes); // User routes
app.use('/api/posts', postRoutes); // Post routes
app.use('/api/trivia', triviaRoutes);   // Trivia routes
app.use('/api/insights', insightsRoutes);// City insights routes
app.use('/api/email', require('./routes/email-routes')); // Email routes

// Only enable this in development environment
app.use('/api/dev', require('./routes/dev-routes'));

//For production
//app.get("*", (req, res) => res.sendFile(path.join(__dirname, 'frontend', 'dist/index.html')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
