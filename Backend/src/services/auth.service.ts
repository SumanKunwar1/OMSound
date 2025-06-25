import { User } from '../models/user.model';
import { env } from '../config/env.config';
import logger from '../utils/logger.utils';
import { getErrorMessage, AppError } from '../utils/error.utils';

export const registerUser = async (userData: {
  email: string;
  password: string;
  name?: string;
}) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new AppError('Email already in use', 400, 'EMAIL_EXISTS');
    }

    // Create new user
    const user = new User(userData);
    await user.save();

    return user;
  } catch (error) {
    logger.error(`Error in registerUser: ${getErrorMessage(error)}`);
    throw error;
  }
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const user = await User.findOne({ email: credentials.email });
    if (!user) {
      throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
    }

    // In a real app, you would verify the password here
    // For now, we'll just check if passwords match (not secure!)
    if (user.password !== credentials.password) {
      throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
    }

    return user;
  } catch (error) {
    logger.error(`Error in loginUser: ${getErrorMessage(error)}`);
    throw error;
  }
};