"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Grid, List, Search, SlidersHorizontal, X, Filter } from "lucide-react"
import SEOHelmet from "../components/seo/SEOHelmet"
import { useSEOData } from "../hooks/useSEOData"
import ProductCard from "../components/shop/ProductCard"
import { productService, type Product } from "../services/product.service"
import AnimatedSection from "../components/utils/AnimatedSection"

export type SortOption =
  | "featured"
  | "price-low-high"
  | "price-high-low"
  | "rating-high-low"
  | "rating-low-high"
  | "name-a-z"
  | "name-z-a"
  | "newest"

interface FilterState {
  sizes: string[]
  tones: string[]
  types: string[]
  musicalNotes: string[]
  categories: string[]
  brands: string[]
  inStock: boolean
  priceRange: [number, number]
}

// Define array filter keys separately
type ArrayFilterKeys = 'sizes' | 'tones' | 'types' | 'musicalNotes' | 'categories' | 'brands'

const PRODUCTS_PER_PAGE = 24

const ShopPage = () => {
  const { seoData } = useSEOData("/shop")
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    sizes: [],
    tones: [],
    types: [],
    musicalNotes: [],
    categories: [],
    brands: [],
    inStock: false,
    priceRange: [0, 1000],
  })

  // Default SEO while loading
  const defaultSEO = {
    title: "waterproofing products - Trinity Waterproofing",
    description:
      "Explore our range of high-quality waterproofing products designed to protect your property from water damage. Shop now for durable solutions!",
    keywords: ["waterproofing", "property protection", "water damage", "waterproofing services", "waterproofing products"],
    ogImage: "/images/shop-collection.jpg",
  }

  const currentSEO = seoData || defaultSEO

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await productService.getProductsForShop()
        setProducts(data)
      } catch (err) {
        console.error("Error fetching products:", err)
        const errorMessage = err instanceof Error ? err.message : "Failed to load products"
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    if (products.length === 0) return []

    let result = [...products]

    // Search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply filters
    if (activeFilters.sizes.length > 0) {
      result = result.filter(product => activeFilters.sizes.includes(product.size))
    }

    if (activeFilters.tones.length > 0) {
      result = result.filter(product => activeFilters.tones.includes(product.tone))
    }

    if (activeFilters.types.length > 0) {
      result = result.filter(product => activeFilters.types.includes(product.type))
    }

    if (activeFilters.musicalNotes.length > 0) {
      result = result.filter(product => activeFilters.musicalNotes.includes(product.musicalNote))
    }

    if (activeFilters.categories.length > 0) {
      result = result.filter(product => activeFilters.categories.includes(product.category))
    }

    if (activeFilters.brands.length > 0) {
      result = result.filter(product => activeFilters.brands.includes(product.brand))
    }

    if (activeFilters.inStock) {
      result = result.filter(product => product.inStock)
    }

    // Price range filter
    result = result.filter(
      product => product.price >= activeFilters.priceRange[0] && product.price <= activeFilters.priceRange[1]
    )

    // Apply sorting
    switch (sortBy) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high-low":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating-high-low":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "rating-low-high":
        result.sort((a, b) => a.rating - b.rating)
        break
      case "name-a-z":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-z-a":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "newest":
        result.sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          }
          return b.id.localeCompare(a.id)
        })
        break
      case "featured":
      default:
        break
    }

    return result
  }, [products, activeFilters, sortBy, searchTerm])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE)
  const currentProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [activeFilters, sortBy, searchTerm])

  // Get unique filter options from products
  const filterOptions = useMemo(() => {
    if (products.length === 0) return {}
    
    return {
      sizes: [...new Set(products.map(p => p.size))].filter(Boolean),
      tones: [...new Set(products.map(p => p.tone))].filter(Boolean),
      types: [...new Set(products.map(p => p.type))].filter(Boolean),
      musicalNotes: [...new Set(products.map(p => p.musicalNote))].filter(Boolean),
      categories: [...new Set(products.map(p => p.category))].filter(Boolean),
      brands: [...new Set(products.map(p => p.brand))].filter(Boolean),
    }
  }, [products])

  const resetFilters = () => {
    setActiveFilters({
      sizes: [],
      tones: [],
      types: [],
      musicalNotes: [],
      categories: [],
      brands: [],
      inStock: false,
      priceRange: [0, 1000],
    })
    setSortBy("featured")
    setSearchTerm("")
    setCurrentPage(1)
  }

  const handleFilterChange = (filterType: keyof FilterState, value: string[] | boolean | [number, number]) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  // Fixed toggleArrayFilter function with proper typing
  const toggleArrayFilter = (filterType: ArrayFilterKeys, value: string) => {
    setActiveFilters(prev => {
      const currentFilter = prev[filterType]
      return {
        ...prev,
        [filterType]: currentFilter.includes(value)
          ? currentFilter.filter(item => item !== value)
          : [...currentFilter, value]
      }
    })
  }

  const activeFilterCount = Object.entries(activeFilters).reduce((count, [key, filter]) => {
    if (key === 'priceRange') {
      const [min, max] = filter as [number, number]
      return count + (min > 0 || max < 1000 ? 1 : 0)
    }
    if (Array.isArray(filter)) return count + filter.length
    if (typeof filter === 'boolean') return count + (filter ? 1 : 0)
    return count
  }, 0)

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    const halfVisible = Math.floor(maxVisible / 2)
    
    let start = Math.max(1, currentPage - halfVisible)
    let end = Math.min(totalPages, start + maxVisible - 1)
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    return pages
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 bg-navy flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gold mx-auto mb-6"></div>
          <p className="text-ivory text-lg">Loading products...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen pt-24 bg-navy">
        <div className="container-custom py-16 text-center">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-serif text-red-400 mb-4">Something went wrong</h2>
            <p className="mb-8 text-ivory/80">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary bg-red-500 hover:bg-red-600"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 bg-navy">
      <SEOHelmet
        title={currentSEO.title}
        description={currentSEO.description}
        keywords={currentSEO.keywords}
        image={currentSEO.ogImage}
        type="website"
        structuredData={seoData?.structuredData}
        url="https://omsoundnepal.com/shop"
      />

      <div className="container-custom py-16">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif text-gold mb-4 bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent">
              Shop Waterproofing Products
            </h1>
            <p className="text-ivory/80 max-w-2xl mx-auto text-lg leading-relaxed">
              Discover our premium selection of waterproofing products designed to safeguard your property against water damage. Browse through our collection and find the perfect solution for your needs.
            </p>
          </div>
        </AnimatedSection>

        {/* Enhanced Search and Controls */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-ivory/60 w-6 h-6" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-charcoal/30 border border-ivory/20 rounded-xl text-ivory placeholder-ivory/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
            />
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Filter Toggle with Badge */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`relative flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                isFilterOpen ? 'bg-gold text-charcoal shadow-lg' : 'bg-charcoal/50 text-ivory hover:bg-charcoal/70'
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-pulse">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex rounded-xl overflow-hidden border border-ivory/20 bg-charcoal/30">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-all ${
                    viewMode === 'grid' ? 'bg-gold text-charcoal' : 'text-ivory hover:bg-charcoal/50'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-all ${
                    viewMode === 'list' ? 'bg-gold text-charcoal' : 'text-ivory hover:bg-charcoal/50'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-3 bg-charcoal/50 border border-ivory/20 rounded-xl text-ivory focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating-high-low">Rating: High to Low</option>
                <option value="name-a-z">Name: A to Z</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enhanced Advanced Filters */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="mb-12 bg-gradient-to-r from-charcoal/40 to-charcoal/60 rounded-2xl p-8 border border-ivory/10 shadow-2xl backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif text-gold flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Advanced Filters
                </h3>
                <button
                  onClick={resetFilters}
                  className="text-ivory/60 hover:text-ivory transition-colors flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {/* Size Filter */}
                <div className="bg-navy/30 rounded-xl p-4">
                  <h4 className="font-medium text-ivory mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-gold rounded-full"></span>
                    Size
                  </h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {filterOptions.sizes?.map(size => (
                      <label key={size} className="flex items-center space-x-2 cursor-pointer hover:bg-ivory/5 p-1 rounded">
                        <input
                          type="checkbox"
                          checked={activeFilters.sizes.includes(size)}
                          onChange={() => toggleArrayFilter('sizes', size)}
                          className="rounded border-ivory/20 text-gold focus:ring-gold"
                        />
                        <span className="text-ivory/80">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div className="bg-navy/30 rounded-xl p-4">
                  <h4 className="font-medium text-ivory mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-gold rounded-full"></span>
                    Category
                  </h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {filterOptions.categories?.map(category => (
                      <label key={category} className="flex items-center space-x-2 cursor-pointer hover:bg-ivory/5 p-1 rounded">
                        <input
                          type="checkbox"
                          checked={activeFilters.categories.includes(category)}
                          onChange={() => toggleArrayFilter('categories', category)}
                          className="rounded border-ivory/20 text-gold focus:ring-gold"
                        />
                        <span className="text-ivory/80">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Type Filter */}
                <div className="bg-navy/30 rounded-xl p-4">
                  <h4 className="font-medium text-ivory mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-gold rounded-full"></span>
                    Type
                  </h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {filterOptions.types?.map(type => (
                      <label key={type} className="flex items-center space-x-2 cursor-pointer hover:bg-ivory/5 p-1 rounded">
                        <input
                          type="checkbox"
                          checked={activeFilters.types.includes(type)}
                          onChange={() => toggleArrayFilter('types', type)}
                          className="rounded border-ivory/20 text-gold focus:ring-gold"
                        />
                        <span className="text-ivory/80">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="bg-navy/30 rounded-xl p-4">
                  <h4 className="font-medium text-ivory mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-gold rounded-full"></span>
                    Price Range
                  </h4>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={activeFilters.priceRange[1]}
                      onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                      className="w-full accent-gold"
                    />
                    <div className="flex justify-between text-sm text-ivory/60">
                      <span>$0</span>
                      <span>${activeFilters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Stock Filter */}
                <div className="bg-navy/30 rounded-xl p-4">
                  <h4 className="font-medium text-ivory mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-gold rounded-full"></span>
                    Availability
                  </h4>
                  <label className="flex items-center space-x-2 cursor-pointer hover:bg-ivory/5 p-1 rounded">
                    <input
                      type="checkbox"
                      checked={activeFilters.inStock}
                      onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                      className="rounded border-ivory/20 text-gold focus:ring-gold"
                    />
                    <span className="text-ivory/80">In Stock Only</span>
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-8 px-4 py-3 bg-charcoal/20 rounded-xl">
          <p className="text-ivory/70 text-sm">
            Showing {((currentPage - 1) * PRODUCTS_PER_PAGE) + 1}-{Math.min(currentPage * PRODUCTS_PER_PAGE, filteredAndSortedProducts.length)} of {filteredAndSortedProducts.length} products
          </p>
          <div className="text-ivory/70 text-sm">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          {currentProducts.length > 0 ? (
            <motion.div
              key={`${currentPage}-${viewMode}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12"
                : "space-y-6 mb-12"
              }
            >
              {currentProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="bg-charcoal/30 rounded-2xl p-12 max-w-md mx-auto">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-xl font-serif text-gold mb-4">No products found</h3>
                <p className="text-ivory/80 mb-6">No products match your current criteria</p>
                <button onClick={resetFilters} className="btn-primary">
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center mb-12">
            <div className="bg-charcoal/30 rounded-2xl p-4 flex items-center space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-3 rounded-xl bg-navy/50 text-ivory hover:bg-navy/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all disabled:hover:bg-navy/50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* First Page */}
              {currentPage > 3 && (
                <>
                  <button
                    onClick={() => setCurrentPage(1)}
                    className="px-4 py-2 rounded-xl bg-navy/50 text-ivory hover:bg-navy/70 transition-all"
                  >
                    1
                  </button>
                  {currentPage > 4 && (
                    <span className="px-2 text-ivory/60">...</span>
                  )}
                </>
              )}

              {/* Page Numbers */}
              {getPageNumbers().map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-xl transition-all font-medium ${
                    currentPage === page
                      ? 'bg-gold text-charcoal shadow-lg transform scale-105'
                      : 'bg-navy/50 text-ivory hover:bg-navy/70'
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Last Page */}
              {currentPage < totalPages - 2 && (
                <>
                  {currentPage < totalPages - 3 && (
                    <span className="px-2 text-ivory/60">...</span>
                  )}
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="px-4 py-2 rounded-xl bg-navy/50 text-ivory hover:bg-navy/70 transition-all"
                  >
                    {totalPages}
                  </button>
                </>
              )}

              {/* Next Button */}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-3 rounded-xl bg-navy/50 text-ivory hover:bg-navy/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all disabled:hover:bg-navy/50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Enhanced Free Shipping Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-gold via-yellow-400 to-gold p-6 rounded-2xl text-center shadow-2xl"
        >
          <div className="flex items-center justify-center gap-3 text-charcoal font-medium text-lg">
            <span className="text-2xl">✨</span>
            <span>Free shipping on all orders over NPR 10,000</span>
            <span className="text-2xl">✨</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ShopPage