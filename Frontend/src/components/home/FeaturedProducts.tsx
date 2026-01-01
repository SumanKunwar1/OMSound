"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Link } from "react-router-dom" // Using react-router-dom Link
import ProductCard from "../../components/shop/ProductCard" // Assuming ProductCard is in components/shop
import { productService, type Product } from "../../services/product.service" // Using your provided product.service

const FeaturedProducts = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const allProducts = await productService.getProductsForShop()
        // Filter for in-stock products and take the first 3
        const inStockProducts = allProducts.filter((product) => product.inStock)
        setFeaturedProducts(inStockProducts.slice(0, 3))
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
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section ref={sectionRef} className="section bg-charcoal py-16">
      <div className="container mx-auto px-4">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.h2 variants={itemVariants} className="section-title text-gold text-center text-3xl font-bold mb-4">
            Featured Products
          </motion.h2>

          <motion.p variants={itemVariants} className="section-subtitle text-ivory/80 text-center text-lg mb-12">
            Experience our most trusted waterproofing solutions
          </motion.p>

          {isLoading ? (
            <div className="text-center text-ivory">Loading featured products...</div>
          ) : error ? (
            <div className="text-center text-red-400">{error}</div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center text-ivory/70">No featured products available at the moment.</div>
          ) : (
            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {featuredProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="mt-16 text-center">
            <Link
              to="/shop"
              className="btn-primary inline-flex items-center justify-center px-6 py-3 rounded-md font-medium bg-gold text-charcoal hover:bg-opacity-90 transition-colors"
            >
              View All Products
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProducts
