// controllers/triviaController.js
const Trivia = require('../models/Trivia');

const triviaController = {
  // Get all trivia
  getAllTrivia: async (req, res) => {
    try {
      const allTrivia = await Trivia.find({});
      res.status(200).json({
        success: true,
        data: allTrivia
      });
    } catch (error) {
      console.error('Error fetching all trivia:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching trivia',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  },

  // Get random trivia (3-4 items)
  getRandomTrivia: async (req, res) => {
    try {
      // Randomly decide whether to fetch 3 or 4 items
      const count = Math.random() < 0.5 ? 3 : 4;

      // Use MongoDB's aggregation pipeline to get random documents
      const randomTrivia = await Trivia.aggregate([
        { $sample: { size: count } }
      ]);

      if (!randomTrivia.length) {
        return res.status(404).json({
          success: false,
          message: 'No trivia found'
        });
      }

      res.status(200).json({
        success: true,
        data: randomTrivia
      });
    } catch (error) {
      console.error('Error fetching random trivia:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching random trivia',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }
};

module.exports = triviaController;