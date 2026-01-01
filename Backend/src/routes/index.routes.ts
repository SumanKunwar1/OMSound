import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import adminRoutes from './admin.routes';
import productRoutes from './product.routes';
import orderRoutes from './order.routes';
import reviewRoutes from './review.routes';
import blogRoutes from './blog.routes';
import seoRoutes from './seo.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/admin', adminRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/reviews', reviewRoutes);
router.use('/blogs', blogRoutes);
router.use('/', seoRoutes); 

export default router;