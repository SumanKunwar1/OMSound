"use client"

import { useState } from "react"
import { Package, Star, Download, Play, Pause } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { canShowPurchasedProducts } from "../../utils/order-helper"
import type { Order } from "../../types/order" // Import Order from the new central file

interface PurchasedProductItem {
  productId: string
  productName: string
  productImage: string
  price: number
  purchaseDate: string
  orderId: string
  quantity: number
}

interface PurchasedProductsProps {
  orders: Order[] // Now uses the imported Order type
}

export function PurchasedProducts({ orders }: PurchasedProductsProps) {
  const { user } = useAuth()
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)

  console.log("PurchasedProducts received orders:", orders) // Debugging log 1

  if (!user) return null

  // Extract all purchased products from orders - using helper function
  const filteredOrders = orders.filter((order) => canShowPurchasedProducts(order.status))
  console.log("Filtered orders for purchased products:", filteredOrders) // Debugging log 2

  const purchasedProducts: PurchasedProductItem[] = filteredOrders.flatMap((order) =>
    order.items.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      productImage: item.productImage,
      price: item.price,
      purchaseDate: order.orderDate,
      orderId: order.id,
      quantity: item.quantity,
    })),
  )
  console.log("Final purchased products array:", purchasedProducts) // Debugging log 3

  const handleAudioPlay = (productId: string) => {
    if (playingAudio === productId) {
      setPlayingAudio(null)
    } else {
      setPlayingAudio(productId)
      // In a real app, you would play the actual audio file here
      setTimeout(() => setPlayingAudio(null), 3000) // Auto stop after 3 seconds for demo
    }
  }

  const handleDownloadGuide = (productName: string) => {
    // Simulate downloading a guide
    alert(`Downloading guide for ${productName}...`)
  }

  const handleRateProduct = (productId: string, rating: number) => {
    // In a real app, you would save this rating
    alert(`Rated ${rating} stars for product ${productId}`)
  }

  if (purchasedProducts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <Package size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Products Yet</h3>
          <p className="text-gray-500 mb-4">Your purchased products will appear here once your orders are delivered.</p>
          <p className="text-sm text-gray-400">
            Products become available when order status is "delivered", "shipped", or "shipping"
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">My Products</h2>
        <span className="bg-gold/20 text-gold px-3 py-1 rounded-full text-sm font-medium">
          {purchasedProducts.length} Products
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {purchasedProducts.map((product, index) => (
          <div
            key={`${product.productId}-${product.orderId}-${index}`}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <img
                src={product.productImage || "/placeholder.svg?height=200&width=300"}
                alt={product.productName}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                Owned
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.productName}</h3>

              <div className="flex items-center justify-between mb-3">
                <span className="text-gold font-bold">${product.price}</span>
                <span className="text-sm text-gray-500">Qty: {product.quantity}</span>
              </div>

              <div className="text-xs text-gray-500 mb-4">
                Purchased: {new Date(product.purchaseDate).toLocaleDateString()}
              </div>

              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => handleAudioPlay(product.productId)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gold/10 text-gold px-3 py-2 rounded-lg hover:bg-gold/20 transition-colors text-sm font-medium"
                >
                  {playingAudio === product.productId ? (
                    <>
                      <Pause size={16} />
                      Playing...
                    </>
                  ) : (
                    <>
                      <Play size={16} />
                      Play Sound
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDownloadGuide(product.productName)}
                  className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  <Download size={16} />
                  Guide
                </button>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Rate this product:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        className="text-gray-300 hover:text-gold cursor-pointer transition-colors"
                        onClick={() => handleRateProduct(product.productId, star)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
