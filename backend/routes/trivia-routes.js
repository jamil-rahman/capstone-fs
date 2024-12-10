const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-prod');
const triviaController = require('../controllers/trivia-controller');

// Route to get random trivia
router.get('/random', triviaController.getRandomTrivia);

// Route to get all trivia
// router.get('/', authMiddleware, triviaController.getAllTrivia);

module.exports = router;