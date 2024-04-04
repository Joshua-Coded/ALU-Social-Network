const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const router = express.Router();

// Enhanced Registration endpoint
router.post('/register', async (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;

    try {
        console.log('Attempting to register user:', username, email);

        const normalizedEmail = email.toLowerCase();

        // Check if email is already in use
        const existingUserByEmail = await User.findOne({ email: normalizedEmail });
        if (existingUserByEmail) {
            console.warn(`Registration failed: Email ${email} is already in use.`);
            return res.status(400).json({ msg: 'Email address is already in use.' });
        }

        // Check if username is already taken
        const existingUserByUsername = await User.findOne({ username }); // Correctly search by username
        if (existingUserByUsername) {
            console.warn(`Registration failed: Username ${username} is already taken.`);
            return res.status(400).json({ msg: 'Username is already taken.' });
        }

        // Creating a new user instance
        const newUser = await new User({
            firstname,
            lastname,
            username,
            email: normalizedEmail,
            password,
        }).save();

        console.log('User registered successfully:', newUser.username, newUser.email);

        // Generate a token
        const payload = { userId: newUser._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

        // Respond with success message, token, and user info
        res.status(201).json({
            message: "User registered successfully",
            token,
            user: { id: newUser._id, username: newUser.username, email: newUser.email },
        });
    } catch (error) {
        console.error(`Error in user registration for ${username}:`, error.message);
        res.status(500).json({ msg: 'Server error during registration.' });
    }
});


// Enhanced Login endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    try {
        console.log(`Login attempt for: ${normalizedEmail}`);

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            console.warn(`Login failed: No user found with email ${normalizedEmail}`);
            return res.status(400).json({ msg: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.warn(`Login failed: Password mismatch for user ${normalizedEmail}`);
            return res.status(400).json({ msg: 'Invalid credentials.' });
        }

        console.log(`Login successful for user: ${user.username}`);
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.json({
            message: "Login successful",
            token,
            user: { id: user._id, username: user.username, email: user.email },
        });
    } catch (error) {
        console.error(`Error during login for ${normalizedEmail}:`, error);
        res.status(500).json({ msg: 'Server error during login.' });
    }
});

module.exports = router;
