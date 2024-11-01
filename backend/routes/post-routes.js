// routes/post-routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { createPost,
    getAllPosts,
    updatePost,
    deletePost,
    getMyPosts } = require('../controllers/post-controller');

// All post routes are protected
router.use(authMiddleware);

// Create post
router.post('/', createPost);

// Get all posts
router.get('/', getAllPosts);
router.get('/my-posts', getMyPosts);
// router.get('/:postId', getPostById);
router.put('/:postId', updatePost);
router.delete('/:postId', deletePost);


module.exports = router;