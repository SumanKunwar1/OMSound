// Blog Posts
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  category: string;
  tags: string[];
  status: 'published' | 'draft' | 'archived';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

// Categories
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  parentId?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
}

// Sliders
export interface Slider {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  buttonText?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
}

// SEO Pages
export interface SEOPage {
  id: string;
  pageName: string;
  path: string;
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
  isActive: boolean;
  updatedAt: string;
}

// Navigation Items
export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  parentId?: string;
  sortOrder: number;
  isActive: boolean;
  target: '_self' | '_blank';
  location: 'header' | 'footer';
}

// Mock data
export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Healing Power of Himalayan Singing Bowls',
    slug: 'healing-power-himalayan-singing-bowls',
    content: '<p>Discover the ancient wisdom and modern science behind singing bowl therapy...</p>',
    excerpt: 'Explore how traditional Himalayan singing bowls can transform your wellness journey through sound healing.',
    featuredImage: 'https://images.pexels.com/photos/9609097/pexels-photo-9609097.jpeg',
    author: 'OMSound Nepal Team',
    category: 'Sound Healing',
    tags: ['sound healing', 'wellness', 'meditation'],
    status: 'published',
    publishedAt: '2024-01-15',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15',
    seo: {
      title: 'The Healing Power of Himalayan Singing Bowls | OMSound Nepal',
      description: 'Discover the ancient wisdom and modern science behind singing bowl therapy and sound healing.',
      keywords: 'singing bowls, sound healing, himalayan bowls, meditation, wellness'
    }
  }
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Traditional Bowls',
    slug: 'traditional-bowls',
    description: 'Authentic traditional singing bowls handcrafted in Nepal',
    sortOrder: 1,
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Sound Healing',
    slug: 'sound-healing',
    description: 'Articles and resources about sound healing therapy',
    sortOrder: 2,
    isActive: true,
    createdAt: '2024-01-01'
  }
];

export const mockSliders: Slider[] = [
  {
    id: '1',
    title: 'Authentic Himalayan Singing Bowls',
    subtitle: 'Handcrafted in Nepal with centuries-old techniques',
    image: 'https://images.pexels.com/photos/9609097/pexels-photo-9609097.jpeg',
    link: '/shop',
    buttonText: 'Shop Now',
    sortOrder: 1,
    isActive: true,
    createdAt: '2024-01-01'
  }
];

export const mockSEOPages: SEOPage[] = [
  {
    id: '1',
    pageName: 'Homepage',
    path: '/',
    title: 'OMSound Nepal - Authentic Himalayan Singing Bowls | Sound Healing & Meditation',
    description: 'Discover authentic handcrafted Himalayan singing bowls from Nepal. Premium quality sound healing instruments for meditation, therapy, and wellness.',
    keywords: 'singing bowls, himalayan singing bowls, sound healing, meditation bowls, nepal',
    isActive: true,
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    pageName: 'Shop',
    path: '/shop',
    title: 'Shop Authentic Himalayan Singing Bowls | OMSound Nepal',
    description: 'Browse our collection of handcrafted Himalayan singing bowls. Each bowl is unique in tone, size, and design.',
    keywords: 'buy singing bowls, himalayan singing bowls shop, meditation bowls for sale',
    isActive: true,
    updatedAt: '2024-01-20'
  }
];

export const mockNavigationItems: NavigationItem[] = [
  {
    id: '1',
    label: 'Home',
    path: '/',
    sortOrder: 1,
    isActive: true,
    target: '_self',
    location: 'header'
  },
  {
    id: '2',
    label: 'Shop',
    path: '/shop',
    sortOrder: 2,
    isActive: true,
    target: '_self',
    location: 'header'
  },
  {
    id: '3',
    label: 'About',
    path: '/about',
    sortOrder: 3,
    isActive: true,
    target: '_self',
    location: 'header'
  }
];