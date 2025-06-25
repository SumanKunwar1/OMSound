import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

export const createServer = () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(helmet());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  return app;
};