"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ShoppingCart, Minus, Plus, ArrowLeft, Star, CheckCircle, Truck, Shield } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { productService, type Product } from "../services/product.service"

const LoadingSpinner = () => (
  <div className="min-h-screen bg-charcoal flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
      <p className="text-ivory/60">Loading product...</p>
    </div>
  </div>
)

const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="min-h-screen bg-charcoal">
    <div className="max-w-4xl mx-auto py-24 text-center px-4">
      <h2 className="text-2xl font-serif font-bold text-gold mb-4">Something went wrong</h2>
      <p className="mb-8 text-ivory/60">{message}</p>
      <Link
        to="/shop"
        className="inline-block bg-gold text-charcoal px-6 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-colors"
      >
        Return to Shop
      </Link>
    </div>
  </div>
)

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [addedToCart, setAddedToCart] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  const { addToCart } = useCart()
  const { user } = useAuth()

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

        const productData = await productService.getProductById(id)
        setProduct(productData)

        const allProducts = await productService.getProductsForShop()

        let related = allProducts
          .filter((p) => p.category === productData.category && p.id !== productData.id)
          .slice(0, 4)

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

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorDisplay message={error} />
  if (!product)
    return (
      <ErrorDisplay message="Product not found. It may have been removed or is no longer available." />
    )

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1))
  }

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleAddToCart = () => {
    if (!user) {
      alert("Please log in to add items to cart")
      return
    }

    if (!product) {
      setError("Product data is not available")
      return
    }

    try {
      addToCart(product, quantity)
      setAddedToCart(true)
      setTimeout(() => {
        setAddedToCart(false)
      }, 2000)
      setQuantity(1)
    } catch (err) {
      console.error("Error adding to cart:", err)
      alert("Failed to add item to cart")
    }
  }

  const handleBuyNow = () => {
    try {
      addToCart(product, quantity)
      window.location.href = "/checkout"
    } catch (err) {
      console.error("Error during buy now:", err)
      alert("Failed to proceed to checkout")
    }
  }

  const renderStars = (rating: number) => {
    return (
      <>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < Math.floor(rating) ? "fill-gold text-gold" : "text-gold/30"
            }
          />
        ))}
      </>
    )
  }

  return (
    <div className="min-h-screen bg-charcoal text-ivory">
      {/* Breadcrumb */}
      <div className="bg-charcoal/80 border-b border-ivory/10">
        <div className="max-w-6xl mx-auto py-4 px-4 flex items-center gap-2 text-sm">
          <Link
            to="/shop"
            className="text-gold hover:text-gold/80 transition-colors flex items-center gap-1 font-medium"
          >
            <ArrowLeft size={16} />
            Back to Shop
          </Link>
          <span className="text-ivory/30">/</span>
          <span className="text-ivory/50">{product.category}</span>
          <span className="text-ivory/30">/</span>
          <span className="text-ivory/70 truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Images */}
          <div className="space-y-4">
            {product.images && product.images.length > 0 ? (
              <>
                <div className="bg-navy/30 rounded-2xl overflow-hidden border border-ivory/10">
                  <img
                    src={product.images[activeImage] || product.images[0]}
                    alt={product.name}
                    className="w-full h-96 object-cover"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = "/placeholder.svg"
                    }}
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {product.images.slice(0, 4).map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`rounded-xl overflow-hidden border-2 transition-all ${
                          activeImage === index
                            ? "border-gold"
                            : "border-ivory/10 hover:border-gold/40"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`View ${index + 1}`}
                          className="w-full h-20 object-cover"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src = "/placeholder.svg"
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="bg-navy/30 rounded-2xl h-96 flex items-center justify-center border border-ivory/10">
                <span className="text-ivory/30">No image available</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category badge */}
            {product.category && (
              <span className="inline-block text-xs uppercase tracking-widest text-gold/70 font-medium border border-gold/30 px-3 py-1 rounded-full">
                {product.category}
              </span>
            )}

            <h1 className="text-3xl font-serif font-bold text-ivory leading-tight">{product.name}</h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-3">
                <div className="flex items-center">{renderStars(product.rating)}</div>
                <span className="text-ivory/60 text-sm">
                  {product.rating.toFixed(1)} ({product.reviewCount || 0} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gold">Rs {product.price.toLocaleString()}</span>
            </div>

            {/* Waterproofing Specifications */}
            <div className="flex flex-wrap gap-2">
              {product.coverage && (
                <span className="text-sm bg-gold/15 text-gold px-3 py-1.5 rounded-lg border border-gold/20">
                  📐 {product.coverage}
                </span>
              )}
              {product.type && (
                <span className="text-sm bg-gold/15 text-gold px-3 py-1.5 rounded-lg border border-gold/20">
                  🔧 {product.type}
                </span>
              )}
              {product.application && (
                <span className="text-sm bg-gold/15 text-gold px-3 py-1.5 rounded-lg border border-gold/20">
                  🏗️ {product.application}
                </span>
              )}
              {product.waterproofingRating && (
                <span className="text-sm bg-gold/15 text-gold px-3 py-1.5 rounded-lg border border-gold/20">
                  ⭐ {product.waterproofingRating}
                </span>
              )}
              {product.durationYears && (
                <span className="text-sm bg-gold/15 text-gold px-3 py-1.5 rounded-lg border border-gold/20">
                  🛡️ {product.durationYears} years warranty
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-ivory/70 leading-relaxed">{product.description}</p>

            {/* Divider */}
            <div className="h-px bg-ivory/10"></div>

            {product.inStock !== false ? (
              <>
                {/* In-stock badge */}
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                  <CheckCircle size={16} />
                  In Stock & Ready to Ship
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-4">
                  <span className="text-ivory/70 font-medium">Quantity:</span>
                  <div className="flex items-center bg-navy/40 border border-ivory/10 rounded-xl overflow-hidden">
                    <button
                      onClick={decreaseQuantity}
                      className="px-4 py-3 hover:bg-navy/60 transition-colors text-ivory disabled:opacity-40"
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <div className="w-16 text-center py-3 font-bold text-ivory border-l border-r border-ivory/10">
                      {quantity}
                    </div>
                    <button
                      onClick={increaseQuantity}
                      className="px-4 py-3 hover:bg-navy/60 transition-colors text-ivory"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Success Message */}
                {addedToCart && (
                  <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl text-sm font-medium flex items-center gap-2 border border-emerald-500/20">
                    <CheckCircle size={16} />
                    Added to cart successfully!
                  </div>
                )}

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gold/20 text-gold py-3.5 px-6 rounded-xl font-medium hover:bg-gold hover:text-charcoal transition-all border border-gold/30 flex items-center justify-center gap-2"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-gold text-charcoal py-3.5 px-6 rounded-xl font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
                    disabled={!product.inStock}
                  >
                    Buy Now
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-red-500/10 text-red-400 py-4 px-5 rounded-xl text-center font-medium border border-red-500/20">
                Currently Out of Stock
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="flex flex-col items-center text-center p-3 bg-navy/20 rounded-xl border border-ivory/10">
                <Truck size={18} className="text-gold mb-1.5" />
                <span className="text-xs text-ivory/60">Free shipping over Rs 10,000</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-navy/20 rounded-xl border border-ivory/10">
                <Shield size={18} className="text-gold mb-1.5" />
                <span className="text-xs text-ivory/60">Quality Guaranteed</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-navy/20 rounded-xl border border-ivory/10">
                <CheckCircle size={18} className="text-gold mb-1.5" />
                <span className="text-xs text-ivory/60">Certified Products</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        {product.details && product.details.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-serif font-bold text-gold mb-6">Product Features</h2>
            <div className="bg-navy/20 rounded-2xl p-8 border border-ivory/10">
              <ul className="space-y-3 text-ivory/80">
                {product.details.map((detail, index) => (
                  <li key={index} className="flex items-baseline gap-3">
                    <span className="text-gold font-bold flex-shrink-0">✓</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Application Instructions */}
        {product.applicationInstructions && product.applicationInstructions.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-serif font-bold text-gold mb-6">Application Instructions</h2>
            <div className="bg-navy/20 rounded-2xl p-8 border border-ivory/10">
              <ol className="space-y-4">
                {product.applicationInstructions.map((instruction, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex-shrink-0 w-7 h-7 bg-gold text-charcoal rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-ivory/80 pt-0.5">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-serif font-bold text-gold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="group bg-navy/20 rounded-xl overflow-hidden border border-ivory/10 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/10 transition-all hover:-translate-y-0.5"
                >
                  <div className="h-44 overflow-hidden">
                    {relatedProduct.images && relatedProduct.images.length > 0 ? (
                      <img
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src = "/placeholder.svg"
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-navy/40 flex items-center justify-center">
                        <span className="text-ivory/30 text-sm">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif font-medium text-ivory group-hover:text-gold transition-colors mb-1.5 line-clamp-2 text-sm">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-gold font-bold text-sm">
                      Rs {relatedProduct.price.toLocaleString()}
                    </p>
                    {relatedProduct.coverage && (
                      <p className="text-xs text-ivory/40 mt-1">Coverage: {relatedProduct.coverage}</p>
                    )}
                    {relatedProduct.rating && (
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={11}
                            className={i < Math.floor(relatedProduct.rating!) ? "fill-gold text-gold" : "text-gold/20"}
                          />
                        ))}
                        <span className="text-xs text-ivory/40 ml-1">({relatedProduct.reviewCount || 0})</span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductPage