// routes/postRoutes.js
const express = require('express');
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

// Matches: POST /api/feed
router.post('/', async (req, res) => {
    const { title, body, author = 'Anonymous' } = req.body; // Assuming 'author' will eventually be replaced by authenticated user info
    try {
        const newPost = new Post({ title, body, author });
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
