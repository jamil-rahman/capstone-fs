const admin = require('firebase-admin');

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        const token = authHeader.split(' ')[1];

        try {
            // Proper token verification for production
            const decodedToken = await admin.auth().verifyIdToken(token);
            
            req.user = {
                uid: decodedToken.uid,
                email: decodedToken.email
            };
            
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token.'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = authMiddleware;