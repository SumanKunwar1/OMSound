import { Router } from 'express';
import authRoutes from './api/auth.routes';
import userRoutes from './api/user.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;