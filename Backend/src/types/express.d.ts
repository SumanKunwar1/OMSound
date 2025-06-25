// types/express.d.ts
import { JwtPayload } from 'jsonwebtoken';

// Define the user payload interface that extends JwtPayload
export interface UserPayload extends JwtPayload {
  userId: string;
  // Add other properties that your JWT token contains
  // email?: string;
  // role?: string;
}

// Extend the Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}