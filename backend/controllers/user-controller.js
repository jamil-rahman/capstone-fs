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

module.exports = { signupUser, loginUser };