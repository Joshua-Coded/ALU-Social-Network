const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();
const crypto = require('crypto');
const transporter = require('../config/nodemailerSetup');

const router = express.Router();

const isValidSchoolEmail = (email) => {
    return email.endsWith("@alustudent.com");
};

// Enhanced Registration endpoint
router.post('/register', async (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;

    if (!isValidSchoolEmail(email)) {
        return res.status(400).json({ message: "Please use your school email address." });
    }


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


// Login endpoint
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

        console.log(`Login successful for user: ${email}`); // Logging the email directly
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.json({
            message: "Login successful",
            token,
            user: { id: user._id, email }, // Sending email directly in the response
        });
    } catch (error) {
        console.error(`Error during login for ${normalizedEmail}:`, error);
        res.status(500).json({ msg: 'Server error during login.' });
    }
});


// POST /api/users/forgot-password
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
        return res.status(404).send('User not found.');
    }

    // Generate a token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now

    await user.save();

    // Send email
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    await transporter.sendMail({
        to: user.email,
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
            `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
            `${resetUrl} \n\n` +
            `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    });

    res.send('A password reset email has been sent.');
});

// POST /api/users/reset-password/:token
router.post('/reset-password/:token', async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        return res.status(400).send('Password reset token is invalid or has expired.');
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.send('Your password has been successfully reset.');
});


module.exports = router;
