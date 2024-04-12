const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: String,
    comment: String
});

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    img: String,
    registrations: [registrationSchema] // Embedded documents for registrations
});

module.exports = mongoose.model('Event', eventSchema);
