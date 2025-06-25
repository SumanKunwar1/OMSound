import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import { getErrorMessage, AppError } from '../utils/error.utils';

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    // Handle AppError instances with their specific status codes
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ 
        error: error.message,
        code: error.code 
      });
      return; // Don't use return res.status()...
    }
    
    // For other errors, use a generic 500 status
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return; // Don't use return res.status()...
    }
    res.json(user);
  } catch (error) {
    // Handle AppError instances with their specific status codes
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ 
        error: error.message,
        code: error.code 
      });
      return; // Don't use return res.status()...
    }
    
    // For other errors, use a generic 500 status
    res.status(500).json({ error: getErrorMessage(error) });
  }
};