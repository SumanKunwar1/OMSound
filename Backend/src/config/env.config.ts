import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/yourdb',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  NODE_ENV: process.env.NODE_ENV || 'development',
};