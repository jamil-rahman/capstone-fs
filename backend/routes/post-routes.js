// routes/post-routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-prod');
const postController = require('../controllers/post-controller');

// All post routes are protected
// router.use(authMiddleware);

// Create post
router.post('/', authMiddleware, postController.createPost);
// Get all posts
router.get('/', authMiddleware, postController.getAllPosts);
router.get('/my-posts', authMiddleware, postController.getMyPosts);
// router.get('/:postId', getPostById);
router.put('/:postId', authMiddleware, postController.updatePost);
router.delete('/:postId', authMiddleware, postController.deletePost);


module.exports = router;