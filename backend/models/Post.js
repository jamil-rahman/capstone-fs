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
    // Reference to User model using MongoDB _id
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // We can also store firebaseUid for additional reference if needed
    authorFirebaseUid: {
        type: String,
        required: true
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt fields
});

// Add index for faster queries
postSchema.index({ author: 1, createdAt: -1 });

const Post = mongoose.model('Post', postSchema);
module.exports = { Post };