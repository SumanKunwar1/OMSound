"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingCart, Star, Zap } from "lucide-react"
import { useCart } from "../../context/CartContext"
import { useAuth } from "../../context/AuthContext"
import LoginModal from "../auth/LoginModal"
import type { Product } from "../../services/product.service"

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { addToCart } = useCart()
  const { user } = useAuth()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      setShowLoginModal(true)
      return
    }

    addToCart(product, 1)
  }

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      setShowLoginModal(true)
      return
    }

    addToCart(product, 1)
    window.location.href = "/cart"
  }

  const handleLoginSuccess = () => {
    addToCart(product, 1)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={12}
        className={`${
          index < Math.floor(rating)
            ? "text-gold fill-gold"
            : index < rating
              ? "text-gold fill-gold opacity-50"
              : "text-gold/30"
        }`}
      />
    ))
  }

  return (
    <>
      <Link
        to={`/product/${product.id}`}
        className="block h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`bg-navy/20 rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 border border-transparent ${
            isHovered ? "shadow-xl shadow-gold/10 border-gold/20 -translate-y-1" : ""
          }`}
        >
          {/* Image */}
          <div className="relative overflow-hidden">
            <div className="aspect-[4/3]">
              <img
                src={product.images?.[0] || "/placeholder.svg?height=240&width=320"}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  isHovered ? "scale-105" : "scale-100"
                }`}
              />
            </div>

            {/* Out of stock badge */}
            {!product.inStock && (
              <div className="absolute top-3 right-3 bg-charcoal/90 text-ivory py-1 px-2 text-xs font-semibold rounded-md">
                Out of Stock
              </div>
            )}

            {/* Hover overlay with action buttons */}
            <div
              className={`absolute inset-0 bg-charcoal/60 flex items-end justify-center pb-4 transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex gap-2 px-3 w-full">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 py-2 flex items-center justify-center gap-1 rounded-lg text-xs font-medium transition-colors ${
                    product.inStock
                      ? "bg-gold/20 text-gold hover:bg-gold hover:text-charcoal border border-gold/40"
                      : "bg-charcoal/50 text-ivory/50 cursor-not-allowed"
                  }`}
                >
                  <ShoppingCart size={13} />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className={`flex-1 py-2 flex items-center justify-center gap-1 rounded-lg text-xs font-medium transition-colors ${
                    product.inStock
                      ? "bg-gold text-charcoal hover:bg-opacity-90"
                      : "bg-charcoal/50 text-ivory/50 cursor-not-allowed"
                  }`}
                >
                  <Zap size={13} />
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col flex-grow">
            {/* Tags */}
            <div className="flex gap-1 mb-2 flex-wrap">
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

            {/* Name & Price */}
            <div className="flex justify-between items-start mb-2 gap-2">
              <h3 className="font-serif text-sm text-ivory leading-tight flex-1">{product.name}</h3>
              <span className="font-bold text-gold text-sm whitespace-nowrap">Rs {product.price.toLocaleString()}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center">{renderStars(product.rating || 0)}</div>
              <span className="text-ivory/50 text-xs">
                {(product.rating || 0).toFixed(1)} ({product.reviewCount || 0})
              </span>
            </div>

            {/* Description */}
            <p className="text-ivory/60 text-xs leading-relaxed line-clamp-2 flex-grow">{product.description}</p>
          </div>
        </div>
      </Link>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onSuccess={handleLoginSuccess} />
    </>
  )
}

export default ProductCard