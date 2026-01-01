import express from 'express';
import {
  createBlog,
  getBlogs,
  getBlogBySlug,
  getBlogById,
  updateBlog,
  deleteBlog,
  uploadFeaturedImage,
  getPublishedBlogs
} from '../controllers/blog.controller';
import { asyncHandler } from '../utils/asyncHandler.utils';
import { uploadFiles } from '../utils/multer';

const router = express.Router();

// Public routes - for frontend blog page
router.get('/public', asyncHandler(getPublishedBlogs));
router.get('/slug/:slug', asyncHandler(getBlogBySlug));

// Admin routes - for admin panel
router.get('/', asyncHandler(getBlogs));
router.get('/:id', asyncHandler(getBlogById));
router.post('/', uploadFiles, asyncHandler(createBlog));
router.put('/:id', uploadFiles, asyncHandler(updateBlog));
router.delete('/:id', asyncHandler(deleteBlog));
router.post('/upload-image', uploadFiles, asyncHandler(uploadFeaturedImage));

export default router;