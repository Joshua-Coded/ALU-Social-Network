const express = require('express');
const multer = require('multer');
const User = require('../models/user');
const path = require('path'); // Ensure path is required if used
const router = express.Router();
const mongoose = require('mongoose');

// Setup multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});
const upload = multer({ storage: storage });

// PUT route for updating user profile with image upload
router.put('/:userId', upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'banner', maxCount: 1 }
]), async (req, res) => {
    const userId = req.params.userId;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    const updates = JSON.parse(req.body.userData || '{}'); // Assuming userData is sent as a JSON string

    // Handling file uploads
    if (req.files.profileImage) {
        updates.profileImage = `/uploads/${req.files.profileImage[0].filename}`;
    }
    if (req.files.banner) {
        updates.banner = `/uploads/${req.files.banner[0].filename}`;
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ message: "Error updating profile", error: error.toString() });
    }
});

module.exports = router;
