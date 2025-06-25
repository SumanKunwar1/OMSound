import { Request, Response, NextFunction } from 'express';
import { generateToken } from '../utils/jwt.utils';
import * as authService from '../services/auth.service';
import { getErrorMessage, AppError } from '../utils/error.utils';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await authService.registerUser(req.body);
    const token = generateToken({ userId: user.id });
    res.status(201).json({ user, token });
  } catch (error) {
    // Handle AppError instances with their specific status codes
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ 
        error: error.message,
        code: error.code 
      });
      return; // Don't use return res.status()...
    }
    
    // For other errors, use a generic 400 status
    res.status(400).json({ error: getErrorMessage(error) });
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await authService.loginUser(req.body);
    const token = generateToken({ userId: user.id });
    res.json({ user, token });
  } catch (error) {
    // Handle AppError instances with their specific status codes
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ 
        error: error.message,
        code: error.code 
      });
      return; // Don't use return res.status()...
    }
    
    // For other errors, use a generic 401 status
    res.status(401).json({ error: getErrorMessage(error) });
  }
};