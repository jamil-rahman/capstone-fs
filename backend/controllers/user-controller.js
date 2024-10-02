const { User } = require('../models/User.js');  
const { getAuth } = require('firebase-admin/auth'); 

// Controller to handle user signup
const signupUser = async (req, res) => {
  // Destructure required fields from request body
  const { email, password, name } = req.body;

  try {
    // Create a new user with Firebase
    const userRecord = await getAuth().createUser({
      email,
      password,
    });

    // Store Firebase UID and user data in MongoDB
    const newUser = new User({
      firebaseUid: userRecord.uid,
      email,
      name,
    });

    await newUser.save(); // Save user in MongoDB

    // Send success response
    res.status(201).json({
      message: 'User signed up successfully',
      userId: newUser._id,
    });
  } catch (error) {
    // Handle errors
    res.status(400).json({
      message: 'Signup failed',
      error: error.message,
    });
  }
};

module.exports = { signupUser };