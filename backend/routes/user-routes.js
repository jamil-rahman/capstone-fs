const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-prod');
const userController = require('../controllers/user-controller');

// POST route for user signup (public)
router.post('/signup', userController.signupUser);

// POST route for user login (private)
router.post('/login', authMiddleware, userController.loginUser);

// Profile Routes
router.get('/profile/:userId', authMiddleware, userController.getUserProfile);
router.put('/profile', authMiddleware, userController.updateProfile);
router.get('/mini-profile/:userId', userController.getMiniProfile);

// GET route for current user (private)
router.get('/me', authMiddleware, userController.getCurrentUser); 

module.exports = router;
