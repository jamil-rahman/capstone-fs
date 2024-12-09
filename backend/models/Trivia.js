const mongoose = require('mongoose');

const triviaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Trivia = mongoose.model('Trivia', triviaSchema);
module.exports = Trivia;