const admin = require('firebase-admin');

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check for auth header
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. Invalid token format.'
            });
        }

        try {
            // Verify Firebase token
            const decodedToken = await admin.auth().verifyIdToken(token);

            // Check token expiration explicitly
            if (decodedToken.exp < Date.now() / 1000) {
                return res.status(401).json({
                    success: false,
                    message: 'Token has expired.'
                });
            }

            // Add user info to request
            req.user = {
                uid: decodedToken.uid,
                email: decodedToken.email,
                // Add any other needed user info from token
                tokenExp: decodedToken.exp
            };

            next();
        } catch (error) {
            // Handle specific Firebase token errors
            if (error.code === 'auth/id-token-expired') {
                return res.status(401).json({
                    success: false,
                    message: 'Token has expired.'
                });
            }

            if (error.code === 'auth/id-token-revoked') {
                return res.status(401).json({
                    success: false,
                    message: 'Token has been revoked.'
                });
            }

            console.error('Token verification error:', error);
            return res.status(401).json({
                success: false,
                message: 'Invalid token.',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Authentication failed'
            });
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Authentication failed'
        });
    }
};

module.exports = authMiddleware;