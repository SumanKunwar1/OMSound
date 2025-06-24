export interface PageSEO {
  noindex: boolean | undefined;
  title: string;
  description: string;
  keywords: string;
  image?: string;
  type?: string;
  structuredData?: object;
}

export const seoData: Record<string, PageSEO> = {
  home: {
    title: "OMSound Nepal - Authentic Himalayan Singing Bowls | Sound Healing & Meditation",
    description: "Discover authentic handcrafted Himalayan singing bowls from Nepal. Premium quality sound healing instruments for meditation, therapy, and wellness. Free worldwide shipping on orders over $100.",
    keywords: "singing bowls, himalayan singing bowls, sound healing, meditation bowls, tibetan bowls, nepal singing bowls, sound therapy, wellness, meditation instruments, handcrafted bowls, authentic singing bowls",
    image: "https://images.pexels.com/photos/9609097/pexels-photo-9609097.jpeg",
    type: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "OMSound Nepal",
      "description": "Authentic handcrafted Himalayan singing bowls from Nepal for sound healing and meditation",
      "url": "https://omsoundnepal.com",
      "logo": "https://omsoundnepal.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+977-1234-5678",
        "contactType": "customer service",
        "availableLanguage": ["English", "Nepali"]
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sanepa, Lalitpur",
        "addressLocality": "Kathmandu Valley",
        "addressCountry": "Nepal"
      },
      "sameAs": [
        "https://facebook.com/omsoundnepal",
        "https://instagram.com/omsoundnepal",
        "https://youtube.com/omsoundnepal"
      ]
    },
    noindex: undefined
  },
  shop: {
    title: "Shop Authentic Himalayan Singing Bowls | OMSound Nepal",
    description: "Browse our collection of handcrafted Himalayan singing bowls. Each bowl is unique in tone, size, and design. Perfect for meditation, sound therapy, and wellness practices.",
    keywords: "buy singing bowls, himalayan singing bowls shop, meditation bowls for sale, sound healing instruments, tibetan bowls online, nepal singing bowls store, handcrafted bowls",
    image: "https://images.pexels.com/photos/6461458/pexels-photo-6461458.jpeg",
    type: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Store",
      "name": "OMSound Nepal Shop",
      "description": "Shop authentic handcrafted Himalayan singing bowls",
      "url": "https://omsoundnepal.com/shop",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Singing Bowls Collection",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Himalayan Singing Bowls",
              "category": "Musical Instruments"
            }
          }
        ]
      }
    },
    noindex: undefined
  },
  about: {
    title: "Our Story - Traditional Himalayan Craftsmanship | OMSound Nepal",
    description: "Learn about OMSound Nepal's 30+ years of traditional Himalayan singing bowl craftsmanship. Discover our heritage, artisan families, and commitment to authentic sound healing instruments.",
    keywords: "omsound nepal story, himalayan craftsmanship, singing bowl artisans, nepal traditional craft, sound healing heritage, authentic singing bowls, himalayan artisans",
    image: "https://images.pexels.com/photos/7969331/pexels-photo-7969331.jpeg",
    type: "website",
    noindex: undefined
  },
  soundHealing: {
    title: "Sound Healing Therapy Sessions | OMSound Nepal",
    description: "Experience transformative sound healing therapy with authentic Himalayan singing bowls. Professional sessions for stress relief, meditation, and wellness. Book your healing journey today.",
    keywords: "sound healing therapy, singing bowl therapy, meditation sessions, stress relief, sound bath, wellness therapy, himalayan sound healing, therapeutic sound sessions",
    image: "https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg",
    type: "service",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Sound Healing Therapy",
      "description": "Professional sound healing therapy sessions using authentic Himalayan singing bowls",
      "provider": {
        "@type": "Organization",
        "name": "OMSound Nepal"
      },
      "serviceType": "Sound Healing Therapy",
      "areaServed": "Worldwide",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Sound Healing Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Individual Sound Bath",
              "description": "60-minute personalized sound healing session"
            },
            "price": "120",
            "priceCurrency": "USD"
          }
        ]
      }
    },
    noindex: undefined
  },
  contact: {
    title: "Contact Us - Get in Touch | OMSound Nepal",
    description: "Contact OMSound Nepal for inquiries about singing bowls, sound healing sessions, or custom orders. Visit our workshop in Kathmandu Valley or reach out online.",
    keywords: "contact omsound nepal, singing bowl inquiries, sound healing contact, nepal workshop visit, custom singing bowls, wholesale inquiries",
    image: "https://images.pexels.com/photos/5993553/pexels-photo-5993553.jpeg",
    type: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact OMSound Nepal",
      "description": "Get in touch with OMSound Nepal for singing bowl inquiries and sound healing sessions",
      "mainEntity": {
        "@type": "Organization",
        "name": "OMSound Nepal",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+977-1234-5678",
          "email": "info@omsoundnepal.com",
          "contactType": "customer service"
        }
      }
    },
    noindex: undefined
  },
  login: {
    title: "Sign In to Your Account | OMSound Nepal",
    description: "Sign in to your OMSound Nepal account to manage orders, track shipments, and access exclusive content about singing bowls and sound healing.",
    keywords: "omsound nepal login, sign in account, customer portal, order tracking, singing bowl account",
    type: "website",
    noindex: true
  },
  signup: {
    title: "Create Your Account | OMSound Nepal",
    description: "Join the OMSound Nepal community. Create your account to shop singing bowls, book sound healing sessions, and receive exclusive updates.",
    keywords: "omsound nepal signup, create account, join community, singing bowl community, sound healing community",
    type: "website",
    noindex: true
  },
  cart: {
    title: "Shopping Cart | OMSound Nepal",
    description: "Review your selected singing bowls and complete your purchase. Secure checkout with worldwide shipping available.",
    keywords: "shopping cart, buy singing bowls, checkout, secure payment, worldwide shipping",
    type: "website",
    noindex: true
  },
  dashboard: {
    title: "My Account Dashboard | OMSound Nepal",
    description: "Manage your OMSound Nepal account, view order history, track shipments, and access your sound healing journey.",
    keywords: "account dashboard, order history, profile management, singing bowl orders",
    type: "website",
    noindex: true
  }
};

export const getProductSEO = (productName: string, productDescription: string, productPrice: number, productImage: string): PageSEO => ({
  title: `${productName} - Authentic Himalayan Singing Bowl | OMSound Nepal`,
  description: `${productDescription} Handcrafted in Nepal with traditional techniques. Price: $${productPrice}. Free worldwide shipping on orders over $100.`,
  keywords: `${productName.toLowerCase()}, singing bowl, himalayan singing bowl, ${productName.toLowerCase()} price, buy ${productName.toLowerCase()}, meditation bowl, sound healing bowl`,
  image: productImage,
  type: "product",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productName,
    "description": productDescription,
    "image": productImage,
    "brand": {
      "@type": "Brand",
      "name": "OMSound Nepal"
    },
    "offers": {
      "@type": "Offer",
      "price": productPrice,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "OMSound Nepal"
      }
    },
    "category": "Musical Instruments",
    "manufacturer": {
      "@type": "Organization",
      "name": "OMSound Nepal"
    }
  },
  noindex: undefined
});