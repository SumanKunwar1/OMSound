// types/express.ts
import { Request } from 'express';

export interface UserPayload {
  userId: string;
  iat?: number;
  exp?: number;
  role?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}