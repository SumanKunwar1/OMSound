import { Request, Response } from 'express';
import SEOPage from '../models/seo.model';
import { validationResult } from 'express-validator';

export const getSEOPages = async (req: Request, res: Response) => {
  try {
    const pages = await SEOPage.find().sort({ updatedAt: -1 });
    res.json(pages);
  } catch (error) {
    console.error('Error fetching SEO pages:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getSEOPageByPath = async (req: Request, res: Response) => {
  try {
    const { path } = req.params;
    const page = await SEOPage.findOne({ path, isActive: true });
    
    if (!page) {
      return res.status(404).json({ message: 'SEO page not found' });
    }
    
    res.json(page);
  } catch (error) {
    console.error('Error fetching SEO page:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createSEOPage = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { pageName, path, title, description, keywords, ogImage, isActive, structuredData } = req.body;
    
    const newPage = new SEOPage({
      pageName,
      path,
      title,
      description,
      keywords: Array.isArray(keywords) 
        ? keywords 
        : keywords.split(',').map((k: string) => k.trim()), // Explicitly type 'k' as string
      ogImage,
      isActive: isActive !== false,
      structuredData
    });

    await newPage.save();
    res.status(201).json(newPage);
  } catch (error) {
    console.error('Error creating SEO page:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateSEOPage = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { pageName, path, title, description, keywords, ogImage, isActive, structuredData } = req.body;
    
    const updatedPage = await SEOPage.findByIdAndUpdate(
      id,
      {
        pageName,
        path,
        title,
        description,
        keywords: Array.isArray(keywords) 
          ? keywords 
          : keywords.split(',').map((k: string) => k.trim()), // Explicitly type 'k' as string
        ogImage,
        isActive,
        structuredData
      },
      { new: true }
    );

    if (!updatedPage) {
      return res.status(404).json({ message: 'SEO page not found' });
    }

    res.json(updatedPage);
  } catch (error) {
    console.error('Error updating SEO page:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteSEOPage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedPage = await SEOPage.findByIdAndDelete(id);
    
    if (!deletedPage) {
      return res.status(404).json({ message: 'SEO page not found' });
    }
    
    res.json({ message: 'SEO page deleted successfully' });
  } catch (error) {
    console.error('Error deleting SEO page:', error);
    res.status(500).json({ message: 'Server error' });
  }
};