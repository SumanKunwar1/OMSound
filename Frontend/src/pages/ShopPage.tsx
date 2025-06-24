import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SEOHelmet from '../components/seo/SEOHelmet';
import { seoData } from '../data/seoData';
import ProductCard from '../components/shop/ProductCard';
import ProductFilter from '../components/shop/ProductFilter';
import { products, SortOption } from '../data/products';
import AnimatedSection from '../components/utils/AnimatedSection';

const ShopPage = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [activeFilters, setActiveFilters] = useState({
    sizes: [] as string[],
    tones: [] as string[],
    types: [] as string[],
    musicalNotes: [] as string[],
    categories: [] as string[],
    brands: [] as string[],
    inStock: false,
    priceRange: [0, 1000] as [number, number]
  });

  const seo = seoData.shop;
  
  useEffect(() => {
    // Apply filters
    let result = [...products];
    
    if (activeFilters.sizes.length > 0) {
      result = result.filter(product => 
        activeFilters.sizes.includes(product.size)
      );
    }
    
    if (activeFilters.tones.length > 0) {
      result = result.filter(product => 
        activeFilters.tones.includes(product.tone)
      );
    }
    
    if (activeFilters.types.length > 0) {
      result = result.filter(product => 
        activeFilters.types.includes(product.type)
      );
    }

    if (activeFilters.musicalNotes.length > 0) {
      result = result.filter(product => 
        activeFilters.musicalNotes.includes(product.musicalNote)
      );
    }

    if (activeFilters.categories.length > 0) {
      result = result.filter(product => 
        activeFilters.categories.includes(product.category)
      );
    }

    if (activeFilters.brands.length > 0) {
      result = result.filter(product => 
        activeFilters.brands.includes(product.brand)
      );
    }

    if (activeFilters.inStock) {
      result = result.filter(product => product.inStock);
    }

    // Price range filter
    result = result.filter(product => 
      product.price >= activeFilters.priceRange[0] && 
      product.price <= activeFilters.priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-high-low':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'rating-low-high':
        result.sort((a, b) => a.rating - b.rating);
        break;
      case 'name-a-z':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-z-a':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
        // For demo purposes, we'll sort by ID (assuming newer products have higher IDs)
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'featured':
      default:
        // Keep original order for featured
        break;
    }
    
    setFilteredProducts(result);
  }, [activeFilters, sortBy]);

  const resetFilters = () => {
    setActiveFilters({
      sizes: [],
      tones: [],
      types: [],
      musicalNotes: [],
      categories: [],
      brands: [],
      inStock: false,
      priceRange: [0, 1000]
    });
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen pt-24 bg-navy">
      <SEOHelmet
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        image={seo.image}
        type={seo.type}
        structuredData={seo.structuredData}
        url="https://omsoundnepal.com/shop"
      />

      <div className="container-custom py-16">
        <AnimatedSection>
          <h1 className="text-center font-serif text-gold mb-2">Shop Singing Bowls</h1>
          <p className="text-center text-ivory/80 max-w-2xl mx-auto mb-12">
            Browse our collection of handcrafted Himalayan singing bowls, each unique in tone, size, and design
          </p>

          {/* Filters */}
          <ProductFilter 
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            resetFilters={resetFilters}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </AnimatedSection>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-ivory/70 text-sm">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Product grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1 
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-ivory/80 mb-4">No products match your selected filters</p>
            <button
              onClick={resetFilters}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
        
        {/* Free Shipping Banner */}
        <div className="mt-16">
          <div className="bg-gold/90 py-3 rounded-lg">
            <p className="text-center text-charcoal font-medium">
              Free worldwide shipping on all orders over $100
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;