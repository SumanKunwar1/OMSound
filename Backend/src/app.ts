import express from 'express';
import { createServer } from './config/server.config';
import { connectDB } from './config/db.config';
import mainRouter from './routes/index.routes'; // Fixed: Updated import path
import { errorHandler, notFound } from './middleware/error.middleware';

const app = createServer();

// Database connection
connectDB();

// Routes
app.use('/api', mainRouter);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;