// controllers/authUser.controller.ts
import { Request, Response } from 'express';
import User from '../models/users.model';
import { generateToken } from '../utils/jwt.utils';
import { AppError } from '../utils/error.utils';
import logger from '../utils/logger.utils';

export const signup = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !password) {
      throw new AppError('All fields are required', 400, 'MISSING_FIELDS');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('Email already in use', 400, 'EMAIL_IN_USE');
    }

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      role: 'customer',
      status: 'active'
    });

    // Generate token
    const token = generateToken({ userId: user._id.toString() });

    // Prepare user response (password is automatically excluded by the model)
    const userResponse = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      joinedDate: user.joinedDate
    };

    logger.info(`New user registered: ${user.email}`);

    return res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      token,
      data: {
        user: userResponse
      }
    });

  } catch (error: any) {
    logger.error('Signup error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: validationErrors,
        code: 'VALIDATION_ERROR'
      });
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'error',
        message: 'Email already exists',
        code: 'DUPLICATE_EMAIL'
      });
    }
    
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
        code: error.code
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      code: 'INTERNAL_SERVER_ERROR'
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      throw new AppError('Email and password are required', 400, 'MISSING_CREDENTIALS');
    }

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
    }

    // Check if user account is active
    if (user.status !== 'active') {
      throw new AppError('Account is not active', 401, 'ACCOUNT_INACTIVE');
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
    }

    // Generate token
    const token = generateToken({ userId: user._id.toString() });

    // Prepare user response
    const userResponse = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      joinedDate: user.joinedDate
    };

    logger.info(`User logged in: ${user.email}`);

    return res.status(200).json({
      status: 'success',
      message: 'Login successful',
      token,
      data: {
        user: userResponse
      }
    });

  } catch (error: any) {
    logger.error('Login error:', error);
    
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
        code: error.code
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      code: 'INTERNAL_SERVER_ERROR'
    });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError('Not authenticated', 401, 'NOT_AUTHENTICATED');
    }

    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }

    return res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });

  } catch (error: any) {
    logger.error('Get current user error:', error);
    
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
        code: error.code
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      code: 'INTERNAL_SERVER_ERROR'
    });
  }
};