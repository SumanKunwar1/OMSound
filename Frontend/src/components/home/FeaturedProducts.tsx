"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Link } from "react-router-dom"
import ProductCard from "../../components/shop/ProductCard"
import { productService, type Product } from "../../services/product.service"

const FeaturedProducts = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const allProducts = await productService.getProductsForShop()
        // Filter for in-stock products and take the first 16 (4 rows × 4 cols)
        const inStockProducts = allProducts.filter((product) => product.inStock)
        // Take up to 16 products for 4 rows of 4
        setFeaturedProducts(inStockProducts.slice(0, 16))
      } catch (err) {
        console.error("Error fetching featured products:", err)
        setError("Failed to load featured products.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section ref={sectionRef} className="section bg-charcoal py-20">
      <div className="container mx-auto px-4">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-4">
            <span className="inline-block text-xs uppercase tracking-widest text-gold/70 font-medium mb-3 border border-gold/30 px-4 py-1 rounded-full">
              Our Products
            </span>
            <h2 className="text-4xl font-serif font-bold text-gold mb-4">Featured Products</h2>
            <p className="text-ivory/70 text-lg max-w-xl mx-auto">
              Experience our most trusted waterproofing solutions
            </p>
          </motion.div>

          {/* Decorative line */}
          <motion.div variants={itemVariants} className="flex items-center justify-center mb-12">
            <div className="h-px w-16 bg-gold/30"></div>
            <div className="w-2 h-2 rounded-full bg-gold mx-3"></div>
            <div className="h-px w-16 bg-gold/30"></div>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-navy/20 rounded-xl overflow-hidden animate-pulse">
                  <div className="aspect-[4/3] bg-navy/40"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-navy/40 rounded w-3/4"></div>
                    <div className="h-3 bg-navy/40 rounded w-full"></div>
                    <div className="h-3 bg-navy/40 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-400 py-8">{error}</div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center text-ivory/70 py-8">No featured products available at the moment.</div>
          ) : (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {featuredProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants} className="h-full">
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* View All Button */}
          <motion.div variants={itemVariants} className="mt-14 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-medium bg-gold text-charcoal hover:bg-opacity-90 transition-all hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5"
            >
              View All Products
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProducts