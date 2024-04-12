const express = require('express');
const Event = require('../models/event');

const router = express.Router();

// Endpoint to create a new event
router.post('/', async (req, res) => {
    try {
        const { name, description, img } = req.body;
        const newEvent = new Event({ name, description, img, registrations: [] });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: "Error creating event", error: error.message });
    }
});

// Endpoint to get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find(); // Use Mongoose to fetch all events from the database
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Error fetching events", error: error.message });
    }
});

// Endpoint for registering to an event
router.post('/:eventId/register', async (req, res) => {
    const { eventId } = req.params;
    const { firstname, lastname, email, phoneNumber, comment } = req.body;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        event.registrations.push({ firstname, lastname, email, phoneNumber, comment });
        await event.save();
        res.status(201).json({ message: "Thank you for registering. Check email for event details for check-in.", registration: req.body });
    } catch (error) {
        res.status(400).json({ message: "Error processing registration", error: error.message });
    }
});

module.exports = router;
