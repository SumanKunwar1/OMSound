// routes/user.routes.ts
import express from 'express';
import { asyncHandler } from '../utils/asyncHandler.utils';
import { 
  getAllUsers, 
  getUserById, 
  updateUser, 
  deleteUser 
} from '../controllers/users.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// Protect all routes after this middleware
router.use(authenticate);

router.get('/', asyncHandler(getAllUsers));
router.get('/:id', asyncHandler(getUserById));
router.patch('/:id', asyncHandler(updateUser));
router.delete('/:id', asyncHandler(deleteUser));

export default router;