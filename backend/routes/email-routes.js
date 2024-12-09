const express = require('express');
const router = express.Router();
const { emailController } = require('../controllers/email-controller');
const authMiddleware = require('../middleware/auth-prod');

router.post('/send', authMiddleware, emailController);

module.exports = router;