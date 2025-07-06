// app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mainRouter from './routes/index.routes';
import { errorHandler, notFound } from './middleware/error.middleware';
import { env } from './config/env.config';

const app = express();

// Basic security
app.use(helmet());

// CORS
app.use(cors({
  origin: env.CLIENT_URL || 'http://localhost:5173', // Removed trailing slash
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'success', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api', mainRouter);

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

export default app;