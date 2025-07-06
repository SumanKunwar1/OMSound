// config/env.config.ts
import dotenv from 'dotenv';

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5000', 10),
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/omsound',
  JWT_SECRET: process.env.JWT_SECRET || 'd310a078b9f4161af928b413967081f31dda6c48fdbfc4146c982ced368196dc',
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX || '100', 10), // 100 requests per window
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173'
};