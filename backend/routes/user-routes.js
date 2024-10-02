const express = require('express');
const { signupUser } = require('../controllers/user-controller.js');

// Create router
const router = express.Router();

// Define POST route for user signup
router.post('/signup', signupUser);

module.exports = router;
