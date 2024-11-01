// middleware/auth.js
const admin = require('firebase-admin');

const authMiddleware = async (req, res, next) => {
    try {
        // Check if Authorization header exists
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        // Get token from header
        const token = authHeader.split(' ')[1];
        console.log('Received token:', token);  // Debug log

        try {
            // For testing purposes, we'll use the token directly as the UID
            req.user = {
                uid: token  // Simply use the token as the UID
            };
            
            console.log('Set user in request:', req.user);  // Debug log
            next();
            
        } catch (error) {
            console.error('Token verification error:', error);
            return res.status(401).json({
                success: false,
                message: 'Invalid token.',
                error: error.message
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error in auth middleware.',
            error: error.message
        });
    }
};

module.exports = authMiddleware;