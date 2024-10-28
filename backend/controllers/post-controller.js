// controllers/post-controller.js
const { Post } = require('../models/Post');
const { User } = require('../models/User');

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


module.exports = {
    createPost,
    getAllPosts
};