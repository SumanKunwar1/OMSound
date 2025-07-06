// controllers/admin.controller.ts
import { Request, Response } from 'express';
import { Admin, IAdmin } from '../models/admin.model';
import { generateToken } from '../utils/jwt.utils';
import { AppError } from '../utils/error.utils';
import { asyncHandler } from '../utils/asyncHandler.utils';

export const adminLogin = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // 1. Check if username and password exist
  if (!username || !password) {
    throw new AppError('Please provide username and password', 400, 'BAD_REQUEST');
  }

  // 2. Check if admin exists and password is correct
  const admin = await Admin.findOne({ username }).select('+password') as IAdmin | null;
  
  if (!admin || !(await admin.correctPassword(password, admin.password))) {
    throw new AppError('Incorrect username or password', 401, 'UNAUTHORIZED');
  }

  // 3. Check if admin is active
  if (admin.status !== 'active') {
    throw new AppError('Your account is not active', 403, 'FORBIDDEN');
  }

  // 4. If everything ok, send token to client
  const token = generateToken({ userId: admin._id.toString() });

  // Create response object without password
  const adminResponse = {
    _id: admin._id.toString(), // Explicitly convert to string
    username: admin.username,
    email: admin.email,
    role: admin.role,
    status: admin.status,
    createdAt: admin.createdAt
  };

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user: adminResponse
    }
  });
});

// Get all admins (additional controller for admin management)
export const getAllAdmins = asyncHandler(async (req: Request, res: Response) => {
  const admins = await Admin.find().select('-password');
  
  res.status(200).json({
    status: 'success',
    results: admins.length,
    data: {
      admins
    }
  });
});

// Create new admin
export const createAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;

  // Check if admin already exists
  const existingAdmin = await Admin.findOne({
    $or: [{ username }, { email }]
  });

  if (existingAdmin) {
    throw new AppError('Admin with this username or email already exists', 400, 'BAD_REQUEST');
  }

  // Create new admin
  const newAdmin = await Admin.create({
    username,
    email,
    password,
    role: role || 'admin',
    status: 'active'
  });

  // Remove password from response
  const adminResponse = {
    _id: newAdmin._id.toString(),
    username: newAdmin.username,
    email: newAdmin.email,
    role: newAdmin.role,
    status: newAdmin.status,
    createdAt: newAdmin.createdAt
  };

  res.status(201).json({
    status: 'success',
    data: {
      admin: adminResponse
    }
  });
});

// Update admin
export const updateAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email, role, status } = req.body;

  const admin = await Admin.findByIdAndUpdate(
    id,
    { username, email, role, status },
    { new: true, runValidators: true }
  ).select('-password');

  if (!admin) {
    throw new AppError('Admin not found', 404, 'NOT_FOUND');
  }

  res.status(200).json({
    status: 'success',
    data: {
      admin
    }
  });
});

// Delete admin
export const deleteAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const admin = await Admin.findByIdAndDelete(id);

  if (!admin) {
    throw new AppError('Admin not found', 404, 'NOT_FOUND');
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
