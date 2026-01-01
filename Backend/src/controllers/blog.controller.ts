import { Request, Response } from 'express';
import Blog from '../models/blog.model';
import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';
import { UploadedFile } from 'express-fileupload';
import { uploadToCloudinary } from '../utils/cloudinary';

interface BlogRequestBody {
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  tags?: string;
  status: 'draft' | 'published' | 'archived';
  seo?: string;
  author?: string;
  existingFeaturedImage?: string;
}

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, content, excerpt, category, tags, status, seo, author } = req.body;
    const files = req.files as { featuredImage?: UploadedFile };

    if (!title || !content || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title, content, and category are required'
      });
    }

    let featuredImage = '';
    
    // Handle featured image upload
    if (files?.featuredImage) {
      try {
        featuredImage = await uploadToCloudinary(
          files.featuredImage.data,
          'blog-images'
        );
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError);
        return res.status(400).json({
          success: false,
          message: 'Error uploading featured image'
        });
      }
    }

    // Generate slug from title
    const slug = slugify(title, { lower: true, strict: true }) + '-' + uuidv4().substring(0, 8);

    const newBlog = new Blog({
      title,
      slug,
      content,
      excerpt: excerpt || '',
      featuredImage,
      author: author || 'Admin',
      category,
      tags: tags ? tags.split(',').map((tag: string) => tag.trim()) : [],
      status: status || 'draft',
      seo: seo ? JSON.parse(seo) : undefined
    });

    await newBlog.save();

    res.status(201).json({
      success: true,
      data: newBlog,
      message: 'Blog post created successfully'
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating blog post'
    });
  }
};

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const { status, category, search, limit = 50 } = req.query;
    const query: any = {};

    if (status) query.status = status;
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .select('-__v');

    res.json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog posts'
    });
  }
};

export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog post'
    });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog post'
    });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { title, content, excerpt, category, tags, status, seo, author, existingFeaturedImage } = req.body;
    const files = req.files as { featuredImage?: UploadedFile };

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    let featuredImage = existingFeaturedImage || blog.featuredImage;
    
    // Handle new featured image upload
    if (files?.featuredImage) {
      try {
        featuredImage = await uploadToCloudinary(
          files.featuredImage.data,
          'blog-images'
        );
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError);
        return res.status(400).json({
          success: false,
          message: 'Error uploading featured image'
        });
      }
    }

    const updateData: any = {
      title: title || blog.title,
      content: content || blog.content,
      excerpt: excerpt !== undefined ? excerpt : blog.excerpt,
      featuredImage,
      author: author || blog.author,
      category: category || blog.category,
      tags: tags ? tags.split(',').map((tag: string) => tag.trim()) : blog.tags,
      status: status || blog.status,
      seo: seo ? JSON.parse(seo) : blog.seo
    };

    // Update slug if title changed
    if (title && title !== blog.title) {
      updateData.slug = slugify(title, { lower: true, strict: true }) + '-' + uuidv4().substring(0, 8);
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      data: updatedBlog,
      message: 'Blog post updated successfully'
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating blog post'
    });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    res.json({
      success: true,
      data: {},
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting blog post'
    });
  }
};

export const uploadFeaturedImage = async (req: Request, res: Response) => {
  try {
    const files = req.files as { featuredImage?: UploadedFile };
    
    if (!files?.featuredImage) {
      return res.status(400).json({
        success: false,
        message: 'Featured image is required'
      });
    }

    const featuredImage = await uploadToCloudinary(
      files.featuredImage.data,
      'blog-images'
    );

    res.json({
      success: true,
      imageUrl: featuredImage,
      message: 'Image uploaded successfully'
    });
  } catch (error) {
    console.error('Error uploading featured image:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading featured image'
    });
  }
};

// Get published blogs for public use
export const getPublishedBlogs = async (req: Request, res: Response) => {
  try {
    const { category, search, limit = 10, page = 1 } = req.query;
    const query: any = { status: 'published' };

    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .select('-content -__v'); // Exclude content from list view

    const total = await Blog.countDocuments(query);

    res.json({
      success: true,
      count: blogs.length,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: blogs
    });
  } catch (error) {
    console.error('Error fetching published blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog posts'
    });
  }
};