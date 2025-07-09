"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { ShoppingCart, Minus, Plus, ArrowLeft, Star } from "lucide-react"
import SEOHelmet from "../components/seo/SEOHelmet"
import { getProductSEO } from "../data/seoData"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { productService, type Product } from "../services/product.service"
import ProductImageGallery from "../components/product/ProductImageGallery"
import ProductReviews from "../components/product/ProductReviews"
import ProductCard from "../components/shop/ProductCard"
import LoginModal from "../components/auth/LoginModal"
import AnimatedSection from "../components/utils/AnimatedSection"

// Error boundary component for handling component-level errors
const ErrorBoundary = ({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) => {
  try {
    return <>{children}</>
  } catch (error) {
    console.error("ProductPage Error:", error)
    return <>{fallback}</>
  }
}

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen pt-24 bg-ivory flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
      <p className="text-charcoal">Loading product...</p>
    </div>
  </div>
)

// Error component
const ErrorDisplay = ({ message, onRetry }: { message: string; onRetry?: () => void }) => (
  <div className="min-h-screen pt-24 bg-ivory">
    <div className="container-custom py-16 text-center">
      <h2 className="text-2xl font-serif text-charcoal mb-4">Something went wrong</h2>
      <p className="mb-8 text-charcoal/80">{message}</p>
      <div className="flex gap-4 justify-center">
        {onRetry && (
          <button onClick={onRetry} className="btn-primary">
            Try Again
          </button>
        )}
        <Link to="/shop" className="btn-secondary">
          Return to Shop
        </Link>
      </div>
    </div>
  </div>
)

// Product not found component
const ProductNotFound = () => (
  <div className="min-h-screen pt-24 bg-ivory">
    <SEOHelmet
      title="Product Not Found | OMSound Nepal"
      description="The product you're looking for doesn't exist or has been removed."
      noindex={true}
      keywords=""
    />
    <div className="container-custom py-16 text-center">
      <h2 className="text-2xl font-serif text-charcoal mb-4">Product Not Found</h2>
      <p className="mb-8 text-charcoal/80">The product you're looking for doesn't exist or has been removed.</p>
      <Link to="/shop" className="btn-primary">
        Return to Shop
      </Link>
    </div>
  </div>
)

const ProductPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<"details" | "reviews">("details")
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

  const { addToCart } = useCart()
  const { user } = useAuth()

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("Product ID is required")
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        // Fetch the specific product
        const productData = await productService.getProductById(id)
        setProduct(productData)

        // Fetch all products for related products
        const allProducts = await productService.getProductsForShop()

        // Get related products
        let related = allProducts
          .filter((p) => p.category === productData.category && p.id !== productData.id)
          .slice(0, 4)

        // If not enough in same category, fill with other products
        if (related.length < 4) {
          const additional = allProducts
            .filter((p) => p.id !== productData.id && !related.some((rp) => rp.id === p.id))
            .slice(0, 4 - related.length)
          related = [...related, ...additional]
        }

        setRelatedProducts(related)
      } catch (err) {
        console.error("Error fetching product:", err)
        const errorMessage = err instanceof Error ? err.message : "Failed to load product"
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
    window.scrollTo(0, 0)
  }, [id])

  // Safe SEO data generation
  const getSafeSEO = () => {
    try {
      if (!product) {
        return {
          title: "Product Not Found | OMSound Nepal",
          description: "The product you're looking for doesn't exist.",
          keywords: "",
          image: "",
          type: "website" as const,
          structuredData: undefined,
        }
      }

      return getProductSEO(product.name, product.description, product.price, product.images?.[0] || "")
    } catch (err) {
      console.error("SEO generation error:", err)
      return {
        title: "OMSound Nepal",
        description: "Authentic Tibetan singing bowls and sound healing instruments",
        keywords: "",
        image: "",
        type: "website" as const,
        structuredData: undefined,
      }
    }
  }

  const seo = getSafeSEO()

  // Safe quantity handlers
  const decreaseQuantity = () => {
    try {
      setQuantity((prev) => Math.max(1, prev - 1))
    } catch (err) {
      console.error("Error decreasing quantity:", err)
    }
  }

  const increaseQuantity = () => {
    try {
      setQuantity((prev) => prev + 1)
    } catch (err) {
      console.error("Error increasing quantity:", err)
    }
  }

  // Safe cart handlers with error handling
  const handleAddToCart = () => {
    try {
      if (!user) {
        setShowLoginModal(true)
        return
      }

      if (!product) {
        throw new Error("Product data is not available")
      }

      // Create product with required image property for cart
      const productForCart = {
        ...product,
        image: product.images?.[0] || "", // Use first image or empty string as fallback
      }

      addToCart(productForCart, quantity)

      // Show success message (optional)
      console.log("Product added to cart successfully")
    } catch (err) {
      console.error("Error adding to cart:", err)
      setError("Failed to add product to cart. Please try again.")
    }
  }

  const handleBuyNow = () => {
    try {
      if (!user) {
        setShowLoginModal(true)
        return
      }

      if (!product) {
        throw new Error("Product data is not available")
      }

      // Create product with required image property for cart
      const productForCart = {
        ...product,
        image: product.images?.[0] || "", // Use first image or empty string as fallback
      }

      // Add product to cart with selected quantity
      addToCart(productForCart, quantity)

      // Navigate to cart page after adding to cart
      navigate("/cart")
    } catch (err) {
      console.error("Error with buy now:", err)
      setError("Failed to process purchase. Please try again.")
    }
  }

  const handleLoginSuccess = () => {
    try {
      if (!product) {
        throw new Error("Product data is not available")
      }

      // Create product with required image property for cart
      const productForCart = {
        ...product,
        image: product.images?.[0] || "", // Use first image or empty string as fallback
      }

      addToCart(productForCart, quantity)
    } catch (err) {
      console.error("Error after login:", err)
      setError("Failed to add product to cart after login.")
    }
  }

  // Safe star rendering
  const renderStars = (rating: number) => {
    try {
      const safeRating = typeof rating === "number" && !isNaN(rating) ? rating : 0

      return Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={16}
          className={`${
            index < Math.floor(safeRating)
              ? "text-gold fill-gold"
              : index < safeRating
                ? "text-gold fill-gold opacity-50"
                : "text-gold/30"
          }`}
        />
      ))
    } catch (err) {
      console.error("Error rendering stars:", err)
      return null
    }
  }

  const retryLoad = () => {
    setError(null)
    setIsLoading(true)
    window.location.reload()
  }

  // Loading state
  if (isLoading) {
    return <LoadingSpinner />
  }

  // Error state
  if (error && !product) {
    return <ErrorDisplay message={error} onRetry={retryLoad} />
  }

  // Product not found
  if (!product) {
    return <ProductNotFound />
  }

  return (
    <ErrorBoundary
      fallback={
        <ErrorDisplay message="An unexpected error occurred while displaying the product." onRetry={retryLoad} />
      }
    >
      <div className="min-h-screen pt-24 bg-navy">
        <SEOHelmet
          title={seo.title}
          description={seo.description}
          keywords={seo.keywords || ""}
          image={seo.image || ""}
          type={seo.type}
          structuredData={seo.structuredData}
          url={`https://omsoundnepal.com/product/${product.id}`}
        />

        {/* Error banner */}
        {error && (
          <div className="bg-red-500 text-white p-4 text-center">
            <p>{error}</p>
            <button onClick={() => setError(null)} className="ml-4 underline hover:no-underline">
              Dismiss
            </button>
          </div>
        )}

        <div className="container-custom py-16">
          {/* Back to shop link */}
          <Link to="/shop" className="inline-flex items-center text-gold hover:text-gold/80 transition-colors mb-6">
            <ArrowLeft size={16} className="mr-1" />
            Back to Shop
          </Link>

          {/* Product details */}
          <div className="bg-navy/50 rounded-lg overflow-hidden shadow-lg mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Product images */}
              <div>
                <ErrorBoundary
                  fallback={
                    <div className="bg-gray-200 h-96 rounded flex items-center justify-center">Image unavailable</div>
                  }
                >
                  <ProductImageGallery
                    images={product.images || []}
                    video={product.video}
                    audio={product.audio}
                    productName={product.name}
                  />
                </ErrorBoundary>
              </div>

              {/* Product info */}
              <div>
                <AnimatedSection>
                  <div className="mb-4">
                    <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">
                      {product.category || "Uncategorized"}
                    </span>
                  </div>

                  <h1 className="font-serif text-3xl lg:text-4xl text-gold mb-4">{product.name}</h1>

                  {/* Rating */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center">{renderStars(product.rating || 0)}</div>
                    <span className="text-ivory/70">
                      {(product.rating || 0).toFixed(1)} ({product.reviewCount || 0} reviews)
                    </span>
                  </div>

                  <div className="mb-6">
                    <span className="text-3xl font-serif text-ivory">${product.price}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.size && (
                      <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">{product.size}</span>
                    )}
                    {product.tone && (
                      <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">{product.tone} Tone</span>
                    )}
                    {product.musicalNote && (
                      <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">{product.musicalNote}</span>
                    )}
                    {product.type && (
                      <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">{product.type}</span>
                    )}
                  </div>

                  <p className="text-ivory/80 mb-8 text-lg leading-relaxed">{product.description}</p>

                  {product.inStock ? (
                    <>
                      {/* Quantity selector */}
                      <div className="flex items-center mb-6">
                        <span className="text-ivory mr-4">Quantity:</span>
                        <div className="flex items-center">
                          <button
                            onClick={decreaseQuantity}
                            className="p-2 bg-charcoal text-ivory rounded-l-md hover:bg-charcoal/80 transition-colors"
                            disabled={quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <div className="w-16 bg-navy text-ivory py-2 text-center font-medium border-t border-b border-charcoal/20">
                            {quantity}
                          </div>
                          <button
                            onClick={increaseQuantity}
                            className="p-2 bg-charcoal text-ivory rounded-r-md hover:bg-charcoal/80 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <button
                          onClick={handleAddToCart}
                          className="flex-1 btn-primary flex items-center justify-center"
                          disabled={!product.inStock}
                        >
                          <ShoppingCart size={18} className="mr-2" />
                          Add to Cart
                        </button>
                        <button
                          onClick={handleBuyNow}
                          className="flex-1 bg-gold text-charcoal py-3 px-6 rounded-md font-medium hover:bg-opacity-90 transition-colors"
                          disabled={!product.inStock}
                        >
                          Buy Now
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="mb-6">
                      <div className="bg-charcoal/50 text-ivory/70 py-3 px-4 rounded text-center mb-4">
                        Currently Out of Stock
                      </div>
                      <p className="text-ivory/60 text-sm">
                        Sign up for notifications when this product is back in stock.
                      </p>
                    </div>
                  )}

                  {/* Shipping note */}
                  <div className="flex items-center justify-center py-3 px-4 bg-navy/30 rounded-md text-sm text-ivory/70">
                    <span>Free worldwide shipping on orders over $100</span>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>

          {/* Product Details and Reviews Tabs */}
          <div className="mb-16">
            <div className="flex border-b border-gold/20 mb-8">
              <button
                onClick={() => setActiveTab("details")}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === "details" ? "text-gold border-b-2 border-gold" : "text-ivory/70 hover:text-ivory"
                }`}
              >
                Product Details
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === "reviews" ? "text-gold border-b-2 border-gold" : "text-ivory/70 hover:text-ivory"
                }`}
              >
                Reviews ({product.reviewCount || 0})
              </button>
            </div>

            {activeTab === "details" ? (
              <AnimatedSection>
                <div className="bg-navy/30 rounded-lg p-8">
                  <h3 className="font-serif text-2xl text-ivory mb-6">Product Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-serif text-lg text-gold mb-4">Details</h4>
                      <ul className="space-y-3 text-ivory/80">
                        {product.details?.map((detail, index) => (
                          <li key={index} className="flex items-baseline">
                            <span className="text-gold mr-3">•</span>
                            <span>{detail}</span>
                          </li>
                        )) || <li className="text-ivory/60">No details available</li>}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-serif text-lg text-gold mb-4">Care Instructions</h4>
                      <ul className="space-y-3 text-ivory/80">
                        {product.careInstructions?.map((instruction, index) => (
                          <li key={index} className="flex items-baseline">
                            <span className="text-gold mr-3">•</span>
                            <span>{instruction}</span>
                          </li>
                        )) || (
                          <>
                            <li className="flex items-baseline">
                              <span className="text-gold mr-3">•</span>
                              <span>Clean with a soft, dry cloth after use</span>
                            </li>
                            <li className="flex items-baseline">
                              <span className="text-gold mr-3">•</span>
                              <span>Store on provided cushion in a dry place</span>
                            </li>
                            <li className="flex items-baseline">
                              <span className="text-gold mr-3">•</span>
                              <span>Avoid extreme temperatures and humidity</span>
                            </li>
                            <li className="flex items-baseline">
                              <span className="text-gold mr-3">•</span>
                              <span>Use lemon juice sparingly to remove tarnish</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ) : (
              <ErrorBoundary fallback={<div className="text-ivory/60 text-center py-8">Reviews unavailable</div>}>
                <ProductReviews productId={product.id} />
              </ErrorBoundary>
            )}
          </div>

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="font-serif text-2xl text-gold mb-8">You May Also Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct, index) => (
                  <AnimatedSection key={relatedProduct.id} delay={0.1 * index}>
                    <ErrorBoundary fallback={<div className="bg-gray-200 h-64 rounded">Product unavailable</div>}>
                      <ProductCard product={relatedProduct} />
                    </ErrorBoundary>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onSuccess={handleLoginSuccess} />
    </ErrorBoundary>
  )
}

export default ProductPage
