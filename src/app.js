const express = require('express');
const cors = require('cors');

// Middlewares
const errorHandler = require('./middleware/errorHandler');

// Route imports
const cvRoutes = require('./routes/cvRoutes');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Application Middleware
app.use(cors());
app.use(express.json());

// Basic health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/cv', cvRoutes);
app.use('/api/blogs', blogRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
