import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHelmetProps {
  title: string;
  description: string;
  keywords: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  siteName?: string;
  locale?: string;
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  nofollow?: boolean;
  structuredData?: object;
}

const SEOHelmet: React.FC<SEOHelmetProps> = ({
  title = "OMSound Nepal - Authentic Himalayan Singing Bowls | Sound Healing & Meditation",
  description = "Discover authentic handcrafted Himalayan singing bowls from Nepal. Premium quality sound healing instruments for meditation, therapy, and wellness. Free worldwide shipping on orders over $100.",
  keywords = "singing bowls, himalayan singing bowls, sound healing, meditation bowls, tibetan bowls, nepal singing bowls, sound therapy, wellness, meditation instruments, handcrafted bowls",
  image = "https://images.pexels.com/photos/9609097/pexels-photo-9609097.jpeg",
  url = "https://omsoundnepal.com",
  type = "website",
  author = "OMSound Nepal",
  siteName = "OMSound Nepal",
  locale = "en_US",
  twitterCard = "summary_large_image",
  twitterSite = "@omsoundnepal",
  twitterCreator = "@omsoundnepal",
  canonicalUrl,
  noindex = false,
  nofollow = false,
  structuredData
}) => {
  const fullTitle = title.includes('OMSound Nepal') ? title : `${title} | OMSound Nepal`;
  const currentUrl = canonicalUrl || url;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={currentUrl} />
      
      {/* Robots Meta Tags */}
      <meta name="robots" content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/svg+xml" href="/src/assets/favicon.svg" />
      <link rel="apple-touch-icon" href="/src/assets/favicon.svg" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHelmet;