const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async function (v) {
                const user = await mongoose.model('User').findById(v);
                return user != null;
            },
            message: 'Referenced user does not exist'
        }
    },
    authorFirebaseUid: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Middleware to check author exists before saving
postSchema.pre('save', async function (next) {
    try {
        const user = await mongoose.model('User').findById(this.author);
        if (!user) {
            throw new Error('Referenced user does not exist');
        }
        next();
    } catch (error) {
        next(error);
    }
});

// Add index for faster queries
postSchema.index({ author: 1, createdAt: -1 });

const Post = mongoose.model('Post', postSchema);
module.exports = { Post };