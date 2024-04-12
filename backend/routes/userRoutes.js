const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();
const crypto = require('crypto');
const transporter = require('../config/nodemailerSetup');
const multer = require('multer');
const path = require('path');

const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');  // ensure this directory exists or is created during server setup
    },
    filename: function (req, file, callback) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        callback(null, file.fieldname + '-' + uniqueSuffix);
    }
});

// Set up the file filter to only accept images
const fileFilter = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true);
    } else {
        callback(new Error('Not an image! Please upload only images.'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });


// valid email address
const isValidSchoolEmail = (email) => {
    return email.match(/^[a-zA-Z0-9._%+-]+@(alustudent\.com|alueducation\.com)$/);
};


router.post('/register', async (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;

    // Log the registration attempt
    console.log(`Attempting to register user with email: ${email} and username: ${username}`);

    if (!isValidSchoolEmail(email.toLowerCase())) {
        console.log(`Registration attempt failed: Invalid email ${email}`);
        return res.status(400).json({ message: "Please use a valid school or staff email address." });
    }


    try {
        const existingUserByEmail = await User.findOne({ email: email.toLowerCase() });
        if (existingUserByEmail) {
            console.log(`Registration failed: Email ${email} is already in use.`);
            return res.status(400).json({ message: 'Email address is already in use.' });
        }

        const existingUserByUsername = await User.findOne({ username: username.toLowerCase() });
        if (existingUserByUsername) {
            console.log(`Registration failed: Username ${username} is already taken.`);
            return res.status(400).json({ message: 'Username is already taken.' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save the new user
        const newUser = new User({
            firstname,
            lastname,
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: hashedPassword,
        });
        await newUser.save();

        // Generate a token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        console.log(`User registered successfully: ${username} (${email})`);

        // Respond with the registration success message
        res.status(201).json({
            message: "Registration successful",
            token,
            user: {
                id: newUser._id,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error(`Error in user registration for ${username} (${email}):`, error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    const { username, password } = req.body; // Use username instead of email

    try {
        console.log(`Login attempt for: ${username}`);

        const user = await User.findOne({ username }); // Find user by username
        if (!user) {
            console.warn(`Login failed: No user found with username ${username}`);
            return res.status(400).json({ msg: 'Invalid credentials.' });
        }


        console.log(`Login successful for user: ${username}`); // Logging the username directly
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.json({
            message: "Login successful",
            token,
            user: { id: user._id, username }, // Include username in the successful login response
        });
    } catch (error) {
        console.error(`Error during login for ${username}:`, error);
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

// Endpoint to update user profile
router.put('/:userId', upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'banner', maxCount: 1 }
]), async (req, res) => {
    try {
        const { userId } = req.params;
        const updates = JSON.parse(req.body.userData);

        // Check if files are uploaded and update the paths accordingly
        if (req.files['profileImage']) {
            updates.profileImage = `/uploads/${req.files['profileImage'][0].filename}`;
        }
        if (req.files['banner']) {
            updates.banner = `/uploads/${req.files['banner'][0].filename}`;
        }

        // Update user in the database
        const user = await User.findByIdAndUpdate(userId, updates, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error(`Profile update error: ${error}`);
        res.status(500).json({ message: "Failed to update profile", error: error.message });
    }
});


module.exports = router;
