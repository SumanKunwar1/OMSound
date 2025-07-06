// utils/jwt.utils.ts
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserPayload } from '../types/express';

const JWT_SECRET = process.env.JWT_SECRET || 'd310a078b9f4161af928b413967081f31dda6c48fdbfc4146c982ced368196dc';

export const generateToken = (payload: { userId: string }): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): UserPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Handle the case where decoded is a string (shouldn't happen with proper JWT)
    if (typeof decoded === 'string') {
      throw new Error('Invalid token format');
    }
    
    // Type guard to ensure we have the required userId property
    if (!decoded || typeof decoded !== 'object' || !('userId' in decoded)) {
      throw new Error('Invalid token payload');
    }
    
    return decoded as UserPayload;
  } catch (error) {
    // Re-throw JWT errors to be handled by the middleware
    throw error;
  }
};