require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const adminRoutes = require('./routes/admin');

const app = express();

// ---- CORS Options ----
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://blogappclient-five.vercel.app'
    ],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

// ---- Routes ----
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/admin', adminRoutes);

// ---- Health Check ----
app.get('/health', (req, res) => {
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    const dbState = states[mongoose.connection.readyState] || 'unknown';

    res.status(200).json({
        status: 'blog-post API is running',
        uptime: process.uptime(),
        timestamp: new Date(),
        database: dbState,
    });
});

// ---- DB + Server ----
const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI, {})
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log('Server listening on port', PORT));
    })
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
    });

module.exports = { app, mongoose };