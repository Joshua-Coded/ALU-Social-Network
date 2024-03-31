// routes/postRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Post = require('../models/post');

// Matches: GET /api/feed
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username').sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Assuming Bearer token
    if (!token) {
        return res.status(401).send({ message: "No token, authorization denied" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error('Error verifying token:', err); // Added error logging
        res.status(401).json({ message: 'Token is not valid' });
    }
};


router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, body } = req.body || {}; // Destructuring with default values
        const userId = req.user ? req.user.id : null;

        if (!title || !body) {
            throw new Error('Missing required fields: title or body'); // Throw a specific error
        }

        const newPost = new Post({
            title,
            body,
            author: userId, // Use the authenticated user's ID
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deleting a post
// Matches: DELETE /api/feed/:postId
router.delete('/:postId', async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.postId);
        if (!deletedPost) return res.status(404).send({ message: 'Post not found' });
        res.status(200).send({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete post' });
    }
});

// Matches: PATCH /api/feed/:postId
router.patch('/:postId', async (req, res) => {
    try {
        const { title, body } = req.body;
        const updatedPost = await Post.findById(req.params.postId);

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (title) updatedPost.title = title;
        if (body) updatedPost.body = body;

        await updatedPost.save();
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update post' });
    }
});


module.exports = router;
