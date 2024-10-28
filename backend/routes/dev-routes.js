// routes/dev-routes.js
const express = require('express');
const router = express.Router();
const devController = require('../controllers/dev-controller');

// Only enable this in development environment

router.post('/generate-token', devController.generateTestToken);

module.exports = router;