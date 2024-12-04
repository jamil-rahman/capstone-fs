const { User } = require('../models/User.js');
const { getAuth } = require('firebase-admin/auth');

// Controller to handle user signup
const signupUser = async (req, res) => {
    const { email, password, name } = req.body;

    // Input validation
    if (!email || !password || !name) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }

    try {
        // Check if user already exists in MongoDB
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

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
            // All other fields will use their default values defined in the mongoose model
        });

        await newUser.save();

        // Return the user object excluding sensitive information
        const userResponse = newUser.toObject();
        delete userResponse.firebaseUid; // Optional: if I want to hide this from client

        res.status(201).json({
            success: true,
            message: 'User signed up successfully',
            user: userResponse
        });
    } catch (error) {
        // Handle specific Firebase errors
        if (error.code === 'auth/email-already-exists') {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Log the error for debugging but send a generic message to client
        console.error('Signup error:', error);
        res.status(400).json({
            success: false,
            message: 'Signup failed',
            error: process.env.NODE_ENV === 'development' ? error.message : 'An error occurred during signup'
        });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const firebaseUid = req.user.uid; // From my auth middleware

        // Get latest user data
        const user = await User.findOne({ firebaseUid })
            .select('-firebaseUid'); // Exclude sensitive data

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user data',
            error: error.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        // Firebase UID comes from authMiddleware
        const firebaseUid = req.user.uid;
        console.log('Login attempt for Firebase UID:', firebaseUid);

        // Find user in MongoDB
        const user = await User.findOne({ firebaseUid });
        console.log('Found user:', user ? 'Yes' : 'No');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found in database'
            });
        }

        // Update last login
        user.lastLoginAt = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                // ... if needed, include other user fields
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
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

        if (updateData.dietaryRestrictions) {
            const validDietaryRestrictions = [
                'None',
                'Halal',
                'Kosher',
                'Vegetarian',
                'Vegan',
                'Pescatarian',
                'Gluten-Free',
                'Dairy-Free',
                'Nut-Free',
                'Shellfish-Free',
                'Low-Carb',
                'Keto',
                'Paleo'
            ];
            const isValid = updateData.dietaryRestrictions.every(restriction =>
                validDietaryRestrictions.includes(restriction)
            );

            if (!isValid) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid dietary restriction value(s)'
                });
            }
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

const getMiniProfile = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find user by MongoDB _id instead of firebaseUid
        const user = await User.findById(userId)
            .select([
                'name',
                'photo',
                'currentCity',
                'occupation',
                'smokes',
                'drinks',
                'prefersPets',
                'cleanliness',
                'budget'
            ]);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Format the response
        const miniProfile = {
            name: user.name,
            photo: user.photo || "",
            location: user.currentCity || 'Not specified',
            occupation: user.occupation || 'Not specified',
            preferences: {
                smokes: user.smokes,
                drinks: user.drinks,
                prefersPets: user.prefersPets,
                cleanliness: user.cleanliness
            },
            budget: {
                min: user.budget.min,
                max: user.budget.max
            }
        };

        res.status(200).json({
            success: true,
            profile: miniProfile
        });

    } catch (error) {
        console.error('Get mini profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch mini profile',
            error: error.message
        });
    }
};

module.exports = { signupUser, getCurrentUser, loginUser, updateProfile, getUserProfile, getMiniProfile };