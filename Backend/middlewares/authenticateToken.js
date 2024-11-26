const jwt = require('jsonwebtoken');
const User = require('../models/userSchema'); // Import the User model

// Middleware to authenticate access token
const authenticateToken = async (req, res, next) => {
    const accessToken = req.cookies.accessToken; // Get access token from cookies
    if (!accessToken) {
        return res.status(401).json({ message: 'Access Token Required' });
    }

    try {
        // Verify access token
        const verified = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = { id: verified.id }; // Store user info in request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            const refreshToken = req.cookies.refreshToken; // Get refresh token from cookies
            if (!refreshToken) {
                return res.status(403).json({ message: 'Access Token Expired and Refresh Token Missing' });
            }

            try {
                const refreshVerified = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
                const checkingUser = await User.findOne({ refreshToken });
                if (!checkingUser) {
                    return res.status(403).json({ message: 'Refresh Token Not Found in Database' });
                }

                const newAccessToken = jwt.sign(
                    { id: refreshVerified.id },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );

                res.cookie('accessToken', newAccessToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'Strict',
                    maxAge: 1 * 60 * 60 * 1000, // 1 hour
                });

                req.user = { id: refreshVerified.id };
                next();
            } catch (refreshErr) {
                return res.status(403).json({ message: 'Invalid Refresh Token', error: refreshErr });
            }
        } else {
            return res.status(403).json({ message: 'Invalid Access Token', error: err });
        }
    }
};

module.exports =  {authenticateToken} ;
