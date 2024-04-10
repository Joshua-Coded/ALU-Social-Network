const express = require('express');
const router = express.Router();
const Announcement = require('../models/announcement');
const checkAuth = require('../config/checkAuth');
const User = require('../models/user'); // Assuming you have a User model

// Get all announcements with additional user data (firstname, lastname, profilePicture)
router.get('/', async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ createdAt: -1 }).populate({
            path: 'createdBy',
            select: 'firstname lastname profilePicture' // Select only required fields
        }).select('title content'); // Select only required fields from Announcement model
        res.json(announcements);
    } catch (error) {
        res.status(500).json({ message: "Error fetching announcements", error: error.message });
    }
});


// Create an announcement
router.post('/', checkAuth, async (req, res) => {
    const { title, content, announcementImage } = req.body;

    try {
        const newAnnouncement = new Announcement({
            title,
            content,
            announcementImage,
            createdBy: req.user.userId // Use decoded user data from the token
        });
        await newAnnouncement.save();

        // Populate createdBy field with firstname, lastname, and profilePicture from User model
        const populatedAnnouncement = await Announcement.findById(newAnnouncement._id)
            .populate('createdBy', 'firstname lastname profilePicture').exec();

        res.status(201).json(populatedAnnouncement);
    } catch (error) {
        res.status(400).json({ message: "Error creating announcement", error: error.message });
    }

});

// Delete an announcement
router.delete('/:id', async (req, res) => {
    try {
        const announcement = await Announcement.findByIdAndDelete(req.params.id);
        if (!announcement) {
            return res.status(404).json({ message: "Announcement not found" });
        }
        res.json({ message: "Announcement deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting announcement", error: error.message });
    }
});

module.exports = router;
