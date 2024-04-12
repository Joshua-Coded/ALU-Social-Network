require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const eventRoutes = require('./routes/eventRoutes');


// Check and create uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Created uploads directory');
} else {
    console.log('Uploads directory already exists');
}

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS configuration to allow requests from your React app
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Could not connect to MongoDB:', err);
});

// Serve files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Register routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/feed', postRoutes); // Post routes
app.use('/api/announcements', announcementRoutes); // Announcement routes
app.use('/api/events', eventRoutes);

// Fallback route for undefined paths
app.use((req, res) => {
    res.status(404).send({ message: "Route not found" });
});

// Listen on the specified port
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
