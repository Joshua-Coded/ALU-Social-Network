require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

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

// Register routes

app.use('/api/users', userRoutes); // User routes
app.use('/api/feed', postRoutes); // Post routes

// Fallback route for undefined paths
app.use((req, res) => {
    res.status(404).send({ message: "Route not found" });
});

// Listen on the specified port
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
