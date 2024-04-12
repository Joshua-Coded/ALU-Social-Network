const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    bio: String,
    skills: [String],
    banner: String,  // URL to banner image
    profileImage: String,  // URL to profile image
    socialLinks: {
        facebook: String,
        twitter: String,
        linkedin: String,
        instagram: String,
    },
    academicDetails: [{
        institution: String,
        degree: String,
        fieldOfStudy: String,
        startYear: Number,
        endYear: Number
    }],
    professionalExperience: [{
        company: String,
        role: String,
        startDate: Date,
        endDate: Date,
        description: String
    }],
    generalInfo: {
        email: String,
        languages: [String],
        location: String
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
