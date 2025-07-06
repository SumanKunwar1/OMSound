// routes/auth.routes.ts
import express from 'express';
import { asyncHandler } from '../utils/asyncHandler.utils';
import { signup, login, getCurrentUser } from '../controllers/authUser.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.post('/signup', asyncHandler(signup));
router.post('/login', asyncHandler(login));

// Protected routes
router.get('/me', authenticate, asyncHandler(getCurrentUser));

export default router;