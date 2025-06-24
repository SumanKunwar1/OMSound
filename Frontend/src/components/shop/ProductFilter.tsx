import React, { useState } from 'react';
import { X, Filter, ChevronDown } from 'lucide-react';
import { filterOptions, SortOption, sortOptions } from '../../data/products';

interface ProductFilterProps {
  activeFilters: {
    sizes: string[];
    tones: string[];
    types: string[];
    musicalNotes: string[];
    categories: string[];
    brands: string[];
    inStock: boolean;
    priceRange: [number, number];
  };
  setActiveFilters: React.Dispatch<React.SetStateAction<{
    sizes: string[];
    tones: string[];
    types: string[];
    musicalNotes: string[];
    categories: string[];
    brands: string[];
    inStock: boolean;
    priceRange: [number, number];
  }>>;
  resetFilters: () => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
}

const ProductFilter = ({ 
  activeFilters, 
  setActiveFilters,
  resetFilters,
  sortBy,
  setSortBy
}: ProductFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const handleFilterChange = (filterType: keyof typeof activeFilters, value: string) => {
    setActiveFilters(prev => {
      if (filterType === 'inStock') {
        return { ...prev, [filterType]: !prev[filterType] };
      }
      
      const currentValues = prev[filterType] as string[];
      if (currentValues.includes(value)) {
        return { ...prev, [filterType]: currentValues.filter(v => v !== value) };
      } else {
        return { ...prev, [filterType]: [...currentValues, value] };
      }
    });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setActiveFilters(prev => ({
      ...prev,
      priceRange: [min, max]
    }));
  };

  const hasActiveFilters = 
    activeFilters.sizes.length > 0 || 
    activeFilters.tones.length > 0 || 
    activeFilters.types.length > 0 ||
    activeFilters.musicalNotes.length > 0 ||
    activeFilters.categories.length > 0 ||
    activeFilters.brands.length > 0 ||
    activeFilters.inStock ||
    (activeFilters.priceRange[0] > 0 || activeFilters.priceRange[1] < 1000);

  const getAllActiveFilterTags = () => {
    const tags: Array<{ type: string; value: string; label: string }> = [];
    
    activeFilters.sizes.forEach(size => tags.push({ type: 'sizes', value: size, label: size }));
    activeFilters.tones.forEach(tone => tags.push({ type: 'tones', value: tone, label: tone }));
    activeFilters.types.forEach(type => tags.push({ type: 'types', value: type, label: type }));
    activeFilters.musicalNotes.forEach(note => tags.push({ type: 'musicalNotes', value: note, label: note }));
    activeFilters.categories.forEach(cat => tags.push({ type: 'categories', value: cat, label: cat }));
    activeFilters.brands.forEach(brand => tags.push({ type: 'brands', value: brand, label: brand }));
    
    if (activeFilters.inStock) {
      tags.push({ type: 'inStock', value: 'true', label: 'In Stock Only' });
    }
    
    if (activeFilters.priceRange[0] > 0 || activeFilters.priceRange[1] < 1000) {
      tags.push({ 
        type: 'priceRange', 
        value: 'custom', 
        label: `$${activeFilters.priceRange[0]} - $${activeFilters.priceRange[1]}` 
      });
    }
    
    return tags;
  };

  const removeFilterTag = (type: string, value: string) => {
    if (type === 'inStock') {
      setActiveFilters(prev => ({ ...prev, inStock: false }));
    } else if (type === 'priceRange') {
      setActiveFilters(prev => ({ ...prev, priceRange: [0, 1000] }));
    } else {
      handleFilterChange(type as keyof typeof activeFilters, value);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="flex items-center text-charcoal bg-ivory/80 hover:bg-ivory transition-colors py-2 px-4 rounded-md shadow-sm border border-gold/20"
        >
          <Filter size={16} className="mr-2" />
          <span>Filter Products</span>
        </button>
        
        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
            className="flex items-center text-charcoal bg-ivory/80 hover:bg-ivory transition-colors py-2 px-4 rounded-md shadow-sm border border-gold/20 min-w-[200px] justify-between"
          >
            <span>Sort: {sortOptions.find(opt => opt.value === sortBy)?.label}</span>
            <ChevronDown size={16} className={`transition-transform ${sortDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {sortDropdownOpen && (
            <div className="absolute top-full right-0 mt-1 bg-ivory border border-gold/20 rounded-md shadow-lg z-10 min-w-[200px]">
              {sortOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSortBy(option.value);
                    setSortDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-gold/10 transition-colors ${
                    sortBy === option.value ? 'bg-gold/20 text-charcoal font-medium' : 'text-charcoal'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {hasActiveFilters && (
          <button 
            onClick={resetFilters}
            className="text-sm text-charcoal/70 hover:text-charcoal underline underline-offset-2"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Filter chips display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {getAllActiveFilterTags().map((tag, index) => (
            <button 
              key={`${tag.type}-${tag.value}-${index}`}
              className="inline-flex items-center bg-gold/20 text-charcoal rounded-full px-3 py-1 text-sm"
              onClick={() => removeFilterTag(tag.type, tag.value)}
            >
              {tag.label}
              <X size={14} className="ml-1" />
            </button>
          ))}
        </div>
      )}

      {/* Filter dropdown panel */}
      {isOpen && (
        <div className="bg-ivory border border-gold/20 rounded-lg shadow-md p-6 mb-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Size filters */}
            <div>
              <h3 className="font-serif text-lg text-charcoal mb-3">Size</h3>
              <div className="space-y-2">
                {filterOptions.sizes.map((size) => (
                  <div key={size} className="flex items-center">
                    <input
                      id={`size-${size}`}
                      type="checkbox"
                      checked={activeFilters.sizes.includes(size)}
                      onChange={() => handleFilterChange('sizes', size)}
                      className="h-4 w-4 text-gold border-gold/30 rounded focus:ring-gold"
                    />
                    <label htmlFor={`size-${size}`} className="ml-2 text-sm text-charcoal">
                      {size}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Musical Note filters */}
            <div>
              <h3 className="font-serif text-lg text-charcoal mb-3">Musical Note</h3>
              <div className="space-y-2">
                {filterOptions.musicalNotes.map((note) => (
                  <div key={note} className="flex items-center">
                    <input
                      id={`note-${note}`}
                      type="checkbox"
                      checked={activeFilters.musicalNotes.includes(note)}
                      onChange={() => handleFilterChange('musicalNotes', note)}
                      className="h-4 w-4 text-gold border-gold/30 rounded focus:ring-gold"
                    />
                    <label htmlFor={`note-${note}`} className="ml-2 text-sm text-charcoal">
                      {note}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Type filters */}
            <div>
              <h3 className="font-serif text-lg text-charcoal mb-3">Type</h3>
              <div className="space-y-2">
                {filterOptions.types.map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      id={`type-${type}`}
                      type="checkbox"
                      checked={activeFilters.types.includes(type)}
                      onChange={() => handleFilterChange('types', type)}
                      className="h-4 w-4 text-gold border-gold/30 rounded focus:ring-gold"
                    />
                    <label htmlFor={`type-${type}`} className="ml-2 text-sm text-charcoal">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Category filters */}
            <div>
              <h3 className="font-serif text-lg text-charcoal mb-3">Category</h3>
              <div className="space-y-2">
                {filterOptions.categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      id={`category-${category}`}
                      type="checkbox"
                      checked={activeFilters.categories.includes(category)}
                      onChange={() => handleFilterChange('categories', category)}
                      className="h-4 w-4 text-gold border-gold/30 rounded focus:ring-gold"
                    />
                    <label htmlFor={`category-${category}`} className="ml-2 text-sm text-charcoal">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Additional filters row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gold/20">
            {/* Availability filter */}
            <div>
              <h3 className="font-serif text-lg text-charcoal mb-3">Availability</h3>
              <div className="flex items-center">
                <input
                  id="in-stock"
                  type="checkbox"
                  checked={activeFilters.inStock}
                  onChange={() => handleFilterChange('inStock', 'true')}
                  className="h-4 w-4 text-gold border-gold/30 rounded focus:ring-gold"
                />
                <label htmlFor="in-stock" className="ml-2 text-sm text-charcoal">
                  In Stock Only
                </label>
              </div>
            </div>

            {/* Price Range filter */}
            <div>
              <h3 className="font-serif text-lg text-charcoal mb-3">Price Range</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={activeFilters.priceRange[0] || ''}
                    onChange={(e) => handlePriceRangeChange(Number(e.target.value) || 0, activeFilters.priceRange[1])}
                    className="w-20 px-2 py-1 border border-gold/30 rounded text-sm"
                  />
                  <span className="text-charcoal">to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={activeFilters.priceRange[1] === 1000 ? '' : activeFilters.priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(activeFilters.priceRange[0], Number(e.target.value) || 1000)}
                    className="w-20 px-2 py-1 border border-gold/30 rounded text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePriceRangeChange(0, 150)}
                    className="text-xs bg-gold/10 text-charcoal px-2 py-1 rounded hover:bg-gold/20"
                  >
                    Under $150
                  </button>
                  <button
                    onClick={() => handlePriceRangeChange(150, 300)}
                    className="text-xs bg-gold/10 text-charcoal px-2 py-1 rounded hover:bg-gold/20"
                  >
                    $150-$300
                  </button>
                  <button
                    onClick={() => handlePriceRangeChange(300, 1000)}
                    className="text-xs bg-gold/10 text-charcoal px-2 py-1 rounded hover:bg-gold/20"
                  >
                    Over $300
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilter;