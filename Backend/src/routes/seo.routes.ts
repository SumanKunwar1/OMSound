import { Router } from 'express';
import {
  getSEOPages,
  getSEOPageByPath,
  createSEOPage,
  updateSEOPage,
  deleteSEOPage
} from '../controllers/seo.controller';
import { check } from 'express-validator';
import { asyncHandler } from '../utils/asyncHandler.utils';

const router = Router();

// Admin routes
router.get('/admin/seo', asyncHandler(getSEOPages));
router.post('/admin/seo', [
  check('pageName', 'Page name is required').notEmpty(),
  check('path', 'Path is required').notEmpty(),
  check('title', 'Title is required').notEmpty(),
  check('description', 'Description is required').notEmpty()
], asyncHandler(createSEOPage));
router.put('/admin/seo/:id', [
  check('pageName', 'Page name is required').notEmpty(),
  check('path', 'Path is required').notEmpty(),
  check('title', 'Title is required').notEmpty(),
  check('description', 'Description is required').notEmpty()
], asyncHandler(updateSEOPage));
router.delete('/admin/seo/:id', asyncHandler(deleteSEOPage));

// Public route to get SEO data by path
router.get('/seo/:path', asyncHandler(getSEOPageByPath));

export default router;