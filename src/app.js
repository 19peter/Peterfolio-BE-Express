import express from 'express';
import cors from 'cors';

// Middlewares
import errorHandler from './middleware/errorHandler.js';

// Route imports
import cvRoutes from './routes/cvRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Application Middleware
app.use(cors({
    origin: [
        'https://peterfolio.cafecart.cloud',
        'http://localhost:5173',
        'https://peterfolio-fe.vercel.app'
    ]
}));
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

export default app;
