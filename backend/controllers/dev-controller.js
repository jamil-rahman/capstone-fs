// controllers/dev-controller.js
const generateTestToken = async (req, res) => {
    try {
        const { uid, email } = req.body;
        console.log('Generating token for UID:', uid);  // Debug log

        // For testing, just return the UID as the token
        res.status(200).json({
            success: true,
            token: uid,  // Simply return the UID as the token
            message: 'Test token generated successfully'
        });
    } catch (error) {
        console.error('Token generation error:', error);
        res.status(500).json({
            success: false,
            message: 'Token generation failed',
            error: error.message
        });
    }
};

module.exports = {
    generateTestToken
};