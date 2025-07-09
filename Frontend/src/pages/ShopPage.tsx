"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import SEOHelmet from "../components/seo/SEOHelmet"
import { seoData } from "../data/seoData"
import ProductCard from "../components/shop/ProductCard"
import ProductFilter from "../components/shop/ProductFilter"
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

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [activeFilters, setActiveFilters] = useState({
    sizes: [] as string[],
    tones: [] as string[],
    types: [] as string[],
    musicalNotes: [] as string[],
    categories: [] as string[],
    brands: [] as string[],
    inStock: false,
    priceRange: [0, 1000] as [number, number],
  })

  const seo = seoData.shop

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await productService.getProductsForShop()
        setProducts(data)
        setFilteredProducts(data)
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

  // Apply filters and sorting
  useEffect(() => {
    if (products.length === 0) return

    // Apply filters
    let result = [...products]

    if (activeFilters.sizes.length > 0) {
      result = result.filter((product) => activeFilters.sizes.includes(product.size))
    }

    if (activeFilters.tones.length > 0) {
      result = result.filter((product) => activeFilters.tones.includes(product.tone))
    }

    if (activeFilters.types.length > 0) {
      result = result.filter((product) => activeFilters.types.includes(product.type))
    }

    if (activeFilters.musicalNotes.length > 0) {
      result = result.filter((product) => activeFilters.musicalNotes.includes(product.musicalNote))
    }

    if (activeFilters.categories.length > 0) {
      result = result.filter((product) => activeFilters.categories.includes(product.category))
    }

    if (activeFilters.brands.length > 0) {
      result = result.filter((product) => activeFilters.brands.includes(product.brand))
    }

    if (activeFilters.inStock) {
      result = result.filter((product) => product.inStock)
    }

    // Price range filter
    result = result.filter(
      (product) => product.price >= activeFilters.priceRange[0] && product.price <= activeFilters.priceRange[1],
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
        // Sort by creation date if available, otherwise by ID
        result.sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          }
          return b.id.localeCompare(a.id)
        })
        break
      case "featured":
      default:
        // Keep original order for featured
        break
    }

    setFilteredProducts(result)
  }, [products, activeFilters, sortBy])

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
  }

  const retryLoad = () => {
    setError(null)
    setIsLoading(true)
    window.location.reload()
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 bg-navy flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-ivory">Loading products...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen pt-24 bg-navy">
        <div className="container-custom py-16 text-center">
          <h2 className="text-2xl font-serif text-gold mb-4">Something went wrong</h2>
          <p className="mb-8 text-ivory/80">{error}</p>
          <div className="flex gap-4 justify-center">
            <button onClick={retryLoad} className="btn-primary">
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
            products={products} // Pass products for filter options
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
                  delay: index * 0.1,
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-ivory/80 mb-4">No products match your selected filters</p>
            <button onClick={resetFilters} className="btn-primary">
              Clear Filters
            </button>
          </div>
        )}

        {/* Free Shipping Banner */}
        <div className="mt-16">
          <div className="bg-gold/90 py-3 rounded-lg">
            <p className="text-center text-charcoal font-medium">Free worldwide shipping on all orders over $100</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPage
