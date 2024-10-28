// routes/post-routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { createPost, getAllPosts } = require('../controllers/post-controller');

// All post routes are protected
router.use(authMiddleware);

// Create post
router.post('/', createPost);

// Get all posts
router.get('/', getAllPosts);

module.exports = router;