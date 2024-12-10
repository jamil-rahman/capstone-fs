// routes/cityInsightsRoutes.js
const express = require('express');
const router = express.Router();
const { getCityInsights } = require('../controllers/insight-controller');
const authMiddleware = require('../middleware/auth-prod');


router.post('/analyze', authMiddleware, getCityInsights);

module.exports = router;