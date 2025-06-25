import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.utils';
import { getErrorMessage, AppError } from '../utils/error.utils';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new AppError('Authentication required', 401, 'NO_TOKEN');
    }
    
    // verifyToken now returns UserPayload, which matches req.user type
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    // Handle JWT-specific errors
    if (error instanceof Error) {
      if (error.name === 'JsonWebTokenError') {
        res.status(401).json({ 
          error: 'Invalid token',
          code: 'INVALID_TOKEN'
        });
        return;
      }
      
      if (error.name === 'TokenExpiredError') {
        res.status(401).json({ 
          error: 'Token expired',
          code: 'TOKEN_EXPIRED'
        });
        return;
      }
    }
    
    // Handle AppError instances
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        error: error.message,
        code: error.code
      });
      return;
    }
    
    // Default authentication error
    res.status(401).json({ 
      error: 'Please authenticate',
      code: 'AUTH_FAILED'
    });
  }
};