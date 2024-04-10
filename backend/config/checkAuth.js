// middleware/checkAuth.js
const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: 'No token provided'
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add the decoded user data to the request
        req.user = decoded; // You can adjust this according to what your token decoding returns


    } catch (error) {
        // Token verification failed or other errors
        return res.status(401).json({
            message: 'Authentication failed'
        });
    }
    next();
};

module.exports = checkAuth;
