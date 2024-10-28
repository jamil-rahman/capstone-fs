const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const userController = require('../controllers/user-controller');

// POST route for user signup (public)
router.post('/signup', userController.signupUser);

// POST route for user login (private)
router.post('/login', authMiddleware, userController.loginUser);


module.exports = router;
