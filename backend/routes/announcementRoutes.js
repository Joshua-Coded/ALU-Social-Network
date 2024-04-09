const express = require('express');
const multer = require('multer');
const Announcement = require('../models/announcement');
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage: storage });

router.post('/', upload.single('announcementImage'), async (req, res) => {
    try {
        console.log(req.body); // Log the request body to see what's being received
        console.log(req.file);
        const { title, content } = req.body;
        // Assume 'userId' is obtained from session or token
        const userId = req.userId; // Example, adjust based on your auth strategy

        if (!title || !content || !userId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const announcementImage = req.file ? req.file.path : '';
        const newAnnouncement = new Announcement({
            title,
            content,
            createdBy: userId,
            announcementImage,
        });

        const savedAnnouncement = await newAnnouncement.save();
        res.status(201).json(savedAnnouncement);
    } catch (error) {
        console.error("Error creating announcement:", error);
        res.status(500).json({ message: "Server error while creating announcement" });
    }
});


module.exports = router;
