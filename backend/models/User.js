// ../models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: null
  },
  currentCity: {
    type: String,
    default: null
  },
  nationality: {
    type: String,
    default: null
  },
  occupation: {
    type: String,
    default: null
  },
  dietaryRestrictions: [{
    type: String,
    enum: [
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
    ],
    default: ['None']
  }],
  smokes: {
    type: Boolean,
    default: false
  },
  drinks: {
    type: Boolean,
    default: false
  },
  prefersPets: {
    type: Boolean,
    default: false
  },
  cleanliness: {
    type: String,
    enum: ['very-clean', 'clean', 'moderate', 'relaxed'],
    default: 'moderate'
  },
  sleepSchedule: {
    type: String,
    enum: ['early-bird', 'night-owl', 'flexible'],
    default: 'flexible'
  },
  guestComfort: {
    type: String,
    enum: ['frequently', 'occasionally', 'rarely', 'never'],
    default: 'occasionally'
  },
  budget: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    }
  },
  preferredGender: {
    type: String,
    enum: ['male', 'female', 'any'],
    default: 'any'
  },
  ageRange: {
    min: {
      type: Number,
      default: 18
    },
    max: {
      type: Number,
      default: 100
    }
  }
}, {
  timestamps: true
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = { User };