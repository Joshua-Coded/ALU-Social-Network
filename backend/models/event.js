const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    // Add other fields as necessary
});

module.exports = mongoose.model('Event', eventSchema);

// Example route (routes/eventRoutes.js)
const express = require('express');
const router = express.Router();
const Event = require('../models/event');

router.get('/events', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: -1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
