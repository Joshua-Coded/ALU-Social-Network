const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Assuming your JWT payload is structured as { userId: user._id, username: user.username }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Adjust based on your payload structure; for example:
        req.user = {
            id: decoded.userId,
            username: decoded.username // Ensure this matches how you generate/sign the JWT
        };
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authenticateToken;
