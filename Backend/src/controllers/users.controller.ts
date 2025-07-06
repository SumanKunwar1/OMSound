// controllers/user.controller.ts
import { Request, Response } from 'express';
import User from '../models/users.model';
import { AppError } from '../utils/error.utils';
import logger from '../utils/logger.utils';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    logger.error(`Get all users error: ${error}`);
    throw error;
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    logger.error(`Get user by ID error: ${error}`);
    throw error;
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phone, role, status } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, email, phone, role, status },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    logger.error(`Update user error: ${error}`);
    throw error;
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    logger.error(`Delete user error: ${error}`);
    throw error;
  }
};