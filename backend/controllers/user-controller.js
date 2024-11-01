const { User } = require('../models/User.js');
const { getAuth } = require('firebase-admin/auth');

// Controller to handle user signup
const signupUser = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        // Create Firebase user
        const userRecord = await getAuth().createUser({
            email,
            password,
        });

        // Create MongoDB user to store firebaseUid and other user data
        const newUser = new User({
            firebaseUid: userRecord.uid,
            email,
            name,
            // All other fields will use their default values
        });

        await newUser.save();

        // Return the entire new user object
        res.status(201).json({
            success: true,
            message: 'User signed up successfully',
            user: newUser
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Signup failed',
            error: error.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const firebaseUid = req.user.uid;

        // Find user and return entire document
        const user = await User.findOne({ firebaseUid });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found in database'
            });
        }

        // On success, return the entire user object and a success message
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error.message
        });
    }
};


const updateProfile = async (req, res) => {
    try {
        const userId = req.user.uid; // From auth middleware
        const updateData = req.body;

        // Fields that cannot be updated directly
        const restrictedFields = ['firebaseUid', 'email'];
        restrictedFields.forEach(field => delete updateData[field]);

        // Validate enum fields if they're being updated
        if (updateData.cleanliness &&
            !['very-clean', 'clean', 'moderate', 'relaxed'].includes(updateData.cleanliness)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid cleanliness value'
            });
        }

        if (updateData.sleepSchedule &&
            !['early-bird', 'night-owl', 'flexible'].includes(updateData.sleepSchedule)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid sleep schedule value'
            });
        }

        if (updateData.guestComfort &&
            !['frequently', 'occasionally', 'rarely', 'never'].includes(updateData.guestComfort)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid guest comfort value'
            });
        }

        if (updateData.preferredGender &&
            !['male', 'female', 'any'].includes(updateData.preferredGender)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid preferred gender value'
            });
        }

        // Validate budget range
        if (updateData.budget) {
            if (updateData.budget.min < 0 || updateData.budget.max < updateData.budget.min) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid budget range'
                });
            }
        }

        // Validate age range
        if (updateData.ageRange) {
            if (updateData.ageRange.min < 18 ||
                updateData.ageRange.max < updateData.ageRange.min ||
                updateData.ageRange.max > 100) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid age range'
                });
            }
        }

        const updatedUser = await User.findOneAndUpdate(
            { firebaseUid: userId },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user: updatedUser
        });

    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update profile',
            error: error.message
        });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;

        // Check if the user exists in our database
        const user = await User.findOne({ firebaseUid: userId })
            .select('-__v'); // Exclude version key

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        console.error('Get user profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user profile',
            error: error.message
        });
    }
};


module.exports = { signupUser, loginUser, updateProfile, getUserProfile };