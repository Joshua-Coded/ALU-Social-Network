const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    profilePicture: { type: String }, // URL to profile picture
    firstName: { type: String }, // First name of the user
    lastName: { type: String }, // Last name of the user
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
