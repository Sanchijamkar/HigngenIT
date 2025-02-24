import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Configure CORS
app.use(cors({
  origin: 'http://localhost:5173',  // Allow requests from your frontend domain
  credentials: true,                // Allow credentials like cookies, headers
}));

// MongoDB connection using Mongoose directly
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit the process if MongoDB connection fails
});

// Routes (make sure your routes are properly set up and imported)
// IDE run code routes

// Define API routes
app.use("/api/user", userRoutes);  // User management routes
app.use("/api/auth", authRoutes);  // Authentication routes



// Global error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

// Start the server
const PORT = process.env.PORT || 3000; // Use PORT from .env or default to 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
