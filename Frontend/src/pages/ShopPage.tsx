"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Grid, List, Search, SlidersHorizontal, X } from "lucide-react"
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
  types: string[]
  applications: string[]
  waterproofingRatings: string[]
  categories: string[]
  brands: string[]
  inStock: boolean
  priceRange: [number, number]
}

type ArrayFilterKeys = "types" | "applications" | "waterproofingRatings" | "categories" | "brands"

const PRODUCTS_PER_PAGE = 25 // 5 per row × 5 rows

const ShopPage = () => {
  const { seoData } = useSEOData("/shop")
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const [activeFilters, setActiveFilters] = useState<FilterState>({
    types: [],
    applications: [],
    waterproofingRatings: [],
    categories: [],
    brands: [],
    inStock: false,
    priceRange: [0, 100000],
  })

  const defaultSEO = {
    title: "Waterproofing Products - Trinity Waterproofing",
    description:
      "Explore our range of high-quality waterproofing products designed to protect your property from water damage. Shop now for durable solutions!",
    keywords: ["waterproofing", "property protection", "water damage", "waterproofing services", "waterproofing products"],
    ogImage: "/images/shop-collection.jpg",
  }

  const currentSEO = seoData || defaultSEO
  const seoTitle = (currentSEO?.title || defaultSEO.title) as string
  const seoDescription = (currentSEO?.description || defaultSEO.description) as string
  const seoKeywords = (currentSEO?.keywords || defaultSEO.keywords) as string | string[]
  const seoImage = (currentSEO?.ogImage || defaultSEO.ogImage) as string

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

  const filteredAndSortedProducts = useMemo(() => {
    if (products.length === 0) return []

    let result = [...products]

    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.application?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (activeFilters.types.length > 0) {
      result = result.filter((product) => product.type && activeFilters.types.includes(product.type))
    }
    if (activeFilters.applications.length > 0) {
      result = result.filter((product) => product.application && activeFilters.applications.includes(product.application))
    }
    if (activeFilters.waterproofingRatings.length > 0) {
      result = result.filter((product) => product.waterproofingRating && activeFilters.waterproofingRatings.includes(product.waterproofingRating))
    }
    if (activeFilters.categories.length > 0) {
      result = result.filter((product) => product.category && activeFilters.categories.includes(product.category))
    }
    if (activeFilters.brands.length > 0) {
      result = result.filter((product) => product.brand && activeFilters.brands.includes(product.brand))
    }
    if (activeFilters.inStock) {
      result = result.filter((product) => product.inStock !== false)
    }

    result = result.filter(
      (product) => product.price >= activeFilters.priceRange[0] && product.price <= activeFilters.priceRange[1],
    )

    switch (sortBy) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high-low":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating-high-low":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case "rating-low-high":
        result.sort((a, b) => (a.rating || 0) - (b.rating || 0))
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
      default:
        break
    }

    return result
  }, [products, activeFilters, sortBy, searchTerm])

  const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE)
  const currentProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [activeFilters, sortBy, searchTerm])

  const filterOptions = useMemo(() => {
    if (products.length === 0) return {}
    return {
      types: [...new Set(products.map((p) => p.type).filter(Boolean))] as string[],
      applications: [...new Set(products.map((p) => p.application).filter(Boolean))] as string[],
      waterproofingRatings: [...new Set(products.map((p) => p.waterproofingRating).filter(Boolean))] as string[],
      categories: [...new Set(products.map((p) => p.category).filter(Boolean))] as string[],
      brands: [...new Set(products.map((p) => p.brand).filter(Boolean))] as string[],
    }
  }, [products])

  const resetFilters = () => {
    setActiveFilters({
      types: [],
      applications: [],
      waterproofingRatings: [],
      categories: [],
      brands: [],
      inStock: false,
      priceRange: [0, 100000],
    })
    setSortBy("featured")
    setSearchTerm("")
    setCurrentPage(1)
  }

  const handleFilterChange = (key: string, value: any) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }))
  }

  const toggleArrayFilter = (key: ArrayFilterKeys, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter((item) => item !== value) : [...prev[key], value],
    }))
  }

  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }

  const activeFilterCount = [
    ...activeFilters.types,
    ...activeFilters.applications,
    ...activeFilters.waterproofingRatings,
    ...activeFilters.categories,
    ...activeFilters.brands,
    ...(activeFilters.inStock ? ["inStock"] : []),
  ].length

  if (isLoading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-ivory/60">Loading products...</p>
        </div>
      </div>
    )
  }

  const FilterSidebarContent = () => (
    <div className="space-y-5">
      <button
        onClick={resetFilters}
        className="w-full px-4 py-2 bg-gold/10 text-gold rounded-xl hover:bg-gold/20 transition-all border border-gold/30 text-sm font-medium"
      >
        Reset All Filters
      </button>

      {/* Type Filter */}
      {filterOptions.types && filterOptions.types.length > 0 && (
        <div className="bg-navy/30 rounded-xl p-4">
          <h4 className="font-medium text-ivory mb-3 flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-gold rounded-full flex-shrink-0"></span>
            Type
          </h4>
          <div className="space-y-2 max-h-36 overflow-y-auto">
            {filterOptions.types.map((type) => (
              <label key={type} className="flex items-center space-x-2 cursor-pointer hover:bg-ivory/5 p-1 rounded">
                <input
                  type="checkbox"
                  checked={activeFilters.types.includes(type)}
                  onChange={() => toggleArrayFilter("types", type)}
                  className="rounded border-ivory/20 text-gold focus:ring-gold"
                />
                <span className="text-ivory/80 text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Application Filter */}
      {filterOptions.applications && filterOptions.applications.length > 0 && (
        <div className="bg-navy/30 rounded-xl p-4">
          <h4 className="font-medium text-ivory mb-3 flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-gold rounded-full flex-shrink-0"></span>
            Application
          </h4>
          <div className="space-y-2 max-h-36 overflow-y-auto">
            {filterOptions.applications.map((app) => (
              <label key={app} className="flex items-center space-x-2 cursor-pointer hover:bg-ivory/5 p-1 rounded">
                <input
                  type="checkbox"
                  checked={activeFilters.applications.includes(app)}
                  onChange={() => toggleArrayFilter("applications", app)}
                  className="rounded border-ivory/20 text-gold focus:ring-gold"
                />
                <span className="text-ivory/80 text-sm">{app}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Waterproofing Rating Filter */}
      {filterOptions.waterproofingRatings && filterOptions.waterproofingRatings.length > 0 && (
        <div className="bg-navy/30 rounded-xl p-4">
          <h4 className="font-medium text-ivory mb-3 flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-gold rounded-full flex-shrink-0"></span>
            Waterproofing Rating
          </h4>
          <div className="space-y-2 max-h-36 overflow-y-auto">
            {filterOptions.waterproofingRatings.map((rating) => (
              <label key={rating} className="flex items-center space-x-2 cursor-pointer hover:bg-ivory/5 p-1 rounded">
                <input
                  type="checkbox"
                  checked={activeFilters.waterproofingRatings.includes(rating)}
                  onChange={() => toggleArrayFilter("waterproofingRatings", rating)}
                  className="rounded border-ivory/20 text-gold focus:ring-gold"
                />
                <span className="text-ivory/80 text-sm">{rating}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      {filterOptions.categories && filterOptions.categories.length > 0 && (
        <div className="bg-navy/30 rounded-xl p-4">
          <h4 className="font-medium text-ivory mb-3 flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-gold rounded-full flex-shrink-0"></span>
            Category
          </h4>
          <div className="space-y-2 max-h-36 overflow-y-auto">
            {filterOptions.categories.map((cat) => (
              <label key={cat} className="flex items-center space-x-2 cursor-pointer hover:bg-ivory/5 p-1 rounded">
                <input
                  type="checkbox"
                  checked={activeFilters.categories.includes(cat)}
                  onChange={() => toggleArrayFilter("categories", cat)}
                  className="rounded border-ivory/20 text-gold focus:ring-gold"
                />
                <span className="text-ivory/80 text-sm">{cat}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Brand Filter */}
      {filterOptions.brands && filterOptions.brands.length > 0 && (
        <div className="bg-navy/30 rounded-xl p-4">
          <h4 className="font-medium text-ivory mb-3 flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-gold rounded-full flex-shrink-0"></span>
            Brand
          </h4>
          <div className="space-y-2 max-h-36 overflow-y-auto">
            {filterOptions.brands.map((brand) => (
              <label key={brand} className="flex items-center space-x-2 cursor-pointer hover:bg-ivory/5 p-1 rounded">
                <input
                  type="checkbox"
                  checked={activeFilters.brands.includes(brand)}
                  onChange={() => toggleArrayFilter("brands", brand)}
                  className="rounded border-ivory/20 text-gold focus:ring-gold"
                />
                <span className="text-ivory/80 text-sm">{brand}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div className="bg-navy/30 rounded-xl p-4">
        <h4 className="font-medium text-ivory mb-3 flex items-center gap-2 text-sm">
          <span className="w-2 h-2 bg-gold rounded-full flex-shrink-0"></span>
          Price Range (Rs)
        </h4>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="100000"
            step="500"
            value={activeFilters.priceRange[1]}
            onChange={(e) => handleFilterChange("priceRange", [0, parseInt(e.target.value)])}
            className="w-full accent-gold"
          />
          <div className="flex justify-between text-sm text-ivory/60">
            <span>Rs {activeFilters.priceRange[0].toLocaleString()}</span>
            <span>Rs {activeFilters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Stock Filter */}
      <div className="bg-navy/30 rounded-xl p-4">
        <h4 className="font-medium text-ivory mb-3 flex items-center gap-2 text-sm">
          <span className="w-2 h-2 bg-gold rounded-full flex-shrink-0"></span>
          Availability
        </h4>
        <label className="flex items-center space-x-2 cursor-pointer hover:bg-ivory/5 p-1 rounded">
          <input
            type="checkbox"
            checked={activeFilters.inStock}
            onChange={(e) => handleFilterChange("inStock", e.target.checked)}
            className="rounded border-ivory/20 text-gold focus:ring-gold"
          />
          <span className="text-ivory/80 text-sm">In Stock Only</span>
        </label>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-charcoal text-ivory">
      <SEOHelmet
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        ogImage={seoImage}
      />

      <AnimatedSection>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="mb-10">
            <span className="inline-block text-xs uppercase tracking-widest text-gold/70 font-medium mb-3 border border-gold/30 px-4 py-1 rounded-full">
              Our Store
            </span>
            <h1 className="text-5xl font-serif font-bold text-gold mb-3">Waterproofing Products</h1>
            <p className="text-ivory/60 text-lg">
              Discover our premium range of waterproofing solutions — {products.length} products available
            </p>
          </div>

          {/* Top Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-ivory/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-navy/30 border border-ivory/10 rounded-xl text-ivory placeholder-ivory/40 focus:outline-none focus:border-gold transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-ivory/40 hover:text-ivory"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-3 bg-navy/30 border border-ivory/10 rounded-xl text-ivory focus:outline-none focus:border-gold cursor-pointer appearance-none min-w-[180px]"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating-high-low">Highest Rated</option>
              <option value="name-a-z">Name: A-Z</option>
              <option value="name-z-a">Name: Z-A</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-navy/30 rounded-xl p-1.5 border border-ivory/10">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 rounded-lg transition-all ${
                  viewMode === "grid" ? "bg-gold/20 text-gold" : "text-ivory/60 hover:text-ivory"
                }`}
                title="Grid view"
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-lg transition-all ${
                  viewMode === "list" ? "bg-gold/20 text-gold" : "text-ivory/60 hover:text-ivory"
                }`}
                title="List view"
              >
                <List size={18} />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all border ${
                isFilterOpen || activeFilterCount > 0
                  ? "bg-gold/20 text-gold border-gold/40"
                  : "bg-gold/10 text-gold border-gold/30 hover:bg-gold/20"
              }`}
            >
              <SlidersHorizontal size={18} />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-gold text-charcoal text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Main Layout */}
          <div className="flex gap-6">
            {/* Sidebar Filters - Desktop */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 280 }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.25 }}
                  className="hidden lg:block flex-shrink-0 overflow-hidden"
                  style={{ minWidth: isFilterOpen ? 280 : 0 }}
                >
                  <div className="w-[280px] sticky top-20 max-h-[calc(100vh-100px)] overflow-y-auto pr-1">
                    <FilterSidebarContent />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile Filter Drawer */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 lg:hidden z-40"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <motion.div
                    initial={{ x: -320 }}
                    animate={{ x: 0 }}
                    exit={{ x: -320 }}
                    transition={{ type: "spring", damping: 25 }}
                    onClick={(e) => e.stopPropagation()}
                    className="fixed left-0 top-0 h-full w-80 bg-charcoal border-r border-ivory/10 overflow-y-auto"
                  >
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-serif text-gold">Filters</h3>
                        <button onClick={() => setIsFilterOpen(false)} className="text-ivory/60 hover:text-ivory">
                          <X size={22} />
                        </button>
                      </div>
                      <FilterSidebarContent />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Products Content */}
            <div className="flex-1 min-w-0">
              {/* Results Info */}
              <div className="flex items-center justify-between mb-6 px-4 py-3 bg-charcoal/30 rounded-xl border border-ivory/5">
                <p className="text-ivory/60 text-sm">
                  Showing{" "}
                  <span className="text-ivory font-medium">
                    {Math.min((currentPage - 1) * PRODUCTS_PER_PAGE + 1, filteredAndSortedProducts.length)}–
                    {Math.min(currentPage * PRODUCTS_PER_PAGE, filteredAndSortedProducts.length)}
                  </span>{" "}
                  of{" "}
                  <span className="text-ivory font-medium">{filteredAndSortedProducts.length}</span> products
                </p>
                {activeFilterCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-gold/70 hover:text-gold text-sm flex items-center gap-1 transition-colors"
                  >
                    <X size={13} />
                    Clear filters
                  </button>
                )}
              </div>

              {/* Product Grid */}
              <AnimatePresence mode="wait">
                {currentProducts.length > 0 ? (
                  <motion.div
                    key={`${currentPage}-${viewMode}-${isFilterOpen}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35 }}
                    className={
                      viewMode === "grid"
                        ? `grid gap-4 mb-12 ${
                            isFilterOpen
                              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                              : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                          }`
                        : "space-y-4 mb-12"
                    }
                  >
                    {currentProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                        className="h-full"
                      >
                        {viewMode === "grid" ? (
                          <ProductCard product={product} />
                        ) : (
                          /* List view */
                          <div className="bg-navy/20 rounded-xl border border-ivory/10 hover:border-gold/20 transition-all p-4 flex gap-5">
                            <div className="w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-navy/40">
                              <img
                                src={product.images?.[0] || "/placeholder.svg"}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start gap-4 mb-1">
                                <h3 className="font-serif text-ivory font-medium truncate">{product.name}</h3>
                                <span className="text-gold font-bold whitespace-nowrap flex-shrink-0">
                                  Rs {product.price.toLocaleString()}
                                </span>
                              </div>
                              <p className="text-ivory/60 text-sm line-clamp-2 mb-2">{product.description}</p>
                              <div className="flex gap-2 flex-wrap">
                                {product.type && (
                                  <span className="text-xs bg-gold/15 text-gold px-2 py-0.5 rounded-full border border-gold/20">
                                    {product.type}
                                  </span>
                                )}
                                {product.application && (
                                  <span className="text-xs bg-gold/15 text-gold px-2 py-0.5 rounded-full border border-gold/20">
                                    {product.application}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                  >
                    <div className="bg-charcoal/30 rounded-2xl p-12 max-w-md mx-auto border border-ivory/10">
                      <div className="text-6xl mb-6">🔍</div>
                      <h3 className="text-xl font-serif text-gold mb-4">No products found</h3>
                      <p className="text-ivory/60 mb-6">No products match your current criteria</p>
                      <button
                        onClick={resetFilters}
                        className="bg-gold text-charcoal px-6 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-colors"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center mb-12">
                  <div className="bg-charcoal/30 rounded-2xl p-3 flex items-center space-x-2 border border-ivory/10">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2.5 rounded-xl bg-navy/50 text-ivory hover:bg-navy/70 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {currentPage > 3 && (
                      <>
                        <button
                          onClick={() => setCurrentPage(1)}
                          className="px-3.5 py-2 rounded-xl bg-navy/50 text-ivory hover:bg-navy/70 transition-all text-sm"
                        >
                          1
                        </button>
                        {currentPage > 4 && <span className="px-2 text-ivory/40">...</span>}
                      </>
                    )}

                    {getPageNumbers().map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3.5 py-2 rounded-xl transition-all font-medium text-sm ${
                          currentPage === page
                            ? "bg-gold text-charcoal shadow-lg"
                            : "bg-navy/50 text-ivory hover:bg-navy/70"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    {currentPage < totalPages - 2 && (
                      <>
                        {currentPage < totalPages - 3 && <span className="px-2 text-ivory/40">...</span>}
                        <button
                          onClick={() => setCurrentPage(totalPages)}
                          className="px-3.5 py-2 rounded-xl bg-navy/50 text-ivory hover:bg-navy/70 transition-all text-sm"
                        >
                          {totalPages}
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2.5 rounded-xl bg-navy/50 text-ivory hover:bg-navy/70 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Free Shipping Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-gold via-yellow-400 to-gold p-5 rounded-2xl text-center shadow-2xl"
              >
                <div className="flex items-center justify-center gap-3 text-charcoal font-semibold text-base">
                  <span className="text-xl">✨</span>
                  <span>Free shipping on all orders over Rs 10,000</span>
                  <span className="text-xl">✨</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}

export default ShopPage