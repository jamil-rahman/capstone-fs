// controllers/post-controller.js
const { Post } = require('../models/Post');
const { User } = require('../models/User');
const mongoose = require('mongoose');

const createPost = async (req, res) => {
    try {
        const { title, body } = req.body;

        console.log('Creating post with UID:', req.user.uid);

        // Find user by Firebase UID
        const user = await User.findOne({ firebaseUid: req.user.uid });
        console.log('Found user:', user);

        if (!user) {
            console.log('No user found with firebaseUid:', req.user.uid);
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Create new post
        const newPost = new Post({
            title,
            body,
            author: user._id,
            authorFirebaseUid: user.firebaseUid
        });

        await newPost.save();
        await newPost.populate('author', 'name email');

        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            post: newPost
        });

    } catch (error) {
        console.error('Create post error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create post',
            error: error.message
        });
    }
};

const getAllPosts = async (req, res) => {
    try {
        // Get posts with detailed author preferences
        const posts = await Post.find()
            .populate('author', [
                'name',
                'photo',
                'dietaryRestrictions',
                'smokes',
                'drinks',
                'prefersPets',
                'cleanliness',
                'sleepSchedule',
                'guestComfort',
                'budget'
            ])
            .sort({ createdAt: -1 })
            .exec();

        // Format the response to make it UI-friendly
        const formattedPosts = posts.map(post => ({
            _id: post._id,
            title: post.title,
            body: post.body,
            createdAt: post.createdAt,
            author: {
                _id: post.author._id,
                name: post.author.name,
                photo: post.author.photo,
                preferences: {
                    dietary: post.author.dietaryRestrictions,
                    lifestyle: {
                        smokes: post.author.smokes,
                        drinks: post.author.drinks,
                        prefersPets: post.author.prefersPets,
                        cleanliness: post.author.cleanliness,
                        sleepSchedule: post.author.sleepSchedule,
                        guestComfort: post.author.guestComfort
                    },
                    budget: post.author.budget
                }
            }
        }));

        res.status(200).json({
            success: true,
            posts: formattedPosts
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch posts',
            error: error.message
        });
    }
};


const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { title, body } = req.body;

        // Validate postId format
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid post ID format'
            });
        }

        // Find the post and populate author
        const post = await Post.findById(postId).populate('author');

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        // Check if the current user is the author
        if (post.authorFirebaseUid !== req.user.uid) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized - can only edit your own posts'
            });
        }

        // Update the post
        post.title = title;
        post.body = body;
        post.updatedAt = Date.now();

        await post.save();

        res.status(200).json({
            success: true,
            message: 'Post updated successfully',
            post
        });

    } catch (error) {
        console.error('Update post error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update post',
            error: error.message
        });
    }
};

/**
 * Delete a post - only the author can delete their post
 */
const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid post ID format'
            });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        // Check if the current user is the author
        if (post.authorFirebaseUid !== req.user.uid) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized - You can only delete your own posts'
            });
        }

        await Post.findByIdAndDelete(postId);

        res.status(200).json({
            success: true,
            message: 'Post deleted successfully'
        });

    } catch (error) {
        console.error('Delete post error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete post',
            error: error.message
        });
    }
};

/**
 * Get all posts by the current user
 */
const getMyPosts = async (req, res) => {
    try {
        const user = await User.findOne({ firebaseUid: req.user.uid });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const posts = await Post.find({ author: user._id })
            .populate('author', [
                'name',
                'photo',
                'dietaryRestrictions',
                'smokes',
                'drinks',
                'prefersPets',
                'cleanliness',
                'sleepSchedule',
                'guestComfort',
                'budget'
            ])
            .sort({ createdAt: -1 })
            .exec();

        // Format posts using the same structure as getAllPosts
        // const formattedPosts = posts.map(post => ({
        //     _id: post._id,
        //     title: post.title,
        //     body: post.body,
        //     createdAt: post.createdAt,
        //     author: {
        //         _id: post.author._id,
        //         name: post.author.name,
        //         photo: post.author.photo,
        //         preferences: {
        //             dietary: post.author.dietaryRestrictions,
        //             lifestyle: {
        //                 smokes: post.author.smokes,
        //                 drinks: post.author.drinks,
        //                 prefersPets: post.author.prefersPets,
        //                 cleanliness: post.author.cleanliness,
        //                 sleepSchedule: post.author.sleepSchedule,
        //                 guestComfort: post.author.guestComfort
        //             },
        //             budget: post.author.budget
        //         }
        //     }
        // }));

        res.status(200).json({
            success: true,
            posts: posts
        });

    } catch (error) {
        console.error('Get my posts error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch your posts',
            error: error.message
        });
    }
};

/**
 * Get a single post by ID
 */
// const getPostById = async (req, res) => {
//     try {
//         const { postId } = req.params;

//         if (!mongoose.Types.ObjectId.isValid(postId)) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid post ID format'
//             });
//         }

//         const post = await Post.findById(postId)
//             .populate('author', [
//                 'name',
//                 'photo',
//                 'dietaryRestrictions',
//                 'smokes',
//                 'drinks',
//                 'prefersPets',
//                 'cleanliness',
//                 'sleepSchedule',
//                 'guestComfort',
//                 'budget'
//             ])
//             .exec();

//         if (!post) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Post not found'
//             });
//         }

//         // Format the post using the same structure
//         const formattedPost = {
//             _id: post._id,
//             title: post.title,
//             body: post.body,
//             createdAt: post.createdAt,
//             author: {
//                 _id: post.author._id,
//                 name: post.author.name,
//                 photo: post.author.photo,
//                 preferences: {
//                     dietary: post.author.dietaryRestrictions,
//                     lifestyle: {
//                         smokes: post.author.smokes,
//                         drinks: post.author.drinks,
//                         prefersPets: post.author.prefersPets,
//                         cleanliness: post.author.cleanliness,
//                         sleepSchedule: post.author.sleepSchedule,
//                         guestComfort: post.author.guestComfort
//                     },
//                     budget: post.author.budget
//                 }
//             }
//         };

//         res.status(200).json({
//             success: true,
//             post: formattedPost
//         });

//     } catch (error) {
//         console.error('Get post by ID error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to fetch post',
//             error: error.message
//         });
//     }
// };

module.exports = {
    createPost,
    getAllPosts,
    updatePost,
    deletePost,
    getMyPosts,
    // getPostById
};