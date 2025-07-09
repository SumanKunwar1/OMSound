// CartPage.tsx
"use client"
import { useNavigate } from "react-router-dom"
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from "lucide-react"
import SEOHelmet from "../components/seo/SEOHelmet"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import AnimatedSection from "../components/utils/AnimatedSection"

const CartPage = () => {
  const { user } = useAuth()
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (!user) {
      navigate("/login")
      return
    }
    navigate("/checkout")
  }

  const deliveryCharge = totalPrice >= 100 ? 0 : 15
  const tax = totalPrice * 0.13
  const finalTotal = totalPrice + deliveryCharge + tax

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <SEOHelmet
        title="Shopping Cart | OMSound Nepal"
        description="Review your selected singing bowls and proceed to checkout"
        noindex={true} 
        keywords={""}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <button onClick={() => navigate("/shop")} className="flex items-center text-gold hover:text-gold/80 transition-colors mb-4">
            <ArrowLeft size={20} className="mr-2" />
            Continue Shopping
          </button>
          <h1 className="text-3xl font-serif text-charcoal">Shopping Cart</h1>
          <p className="text-charcoal/70 mt-2">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {cart.length === 0 ? (
          <AnimatedSection>
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart size={40} className="text-gray-400" />
              </div>
              <h2 className="text-2xl font-serif text-charcoal mb-4">Your cart is empty</h2>
              <p className="text-charcoal/70 mb-8">
                Discover our beautiful collection of authentic Himalayan singing bowls
              </p>
              <button
                onClick={() => navigate("/shop")}
                className="inline-flex items-center px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors"
              >
                Start Shopping
                <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </AnimatedSection>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-charcoal mb-6">Cart Items</h2>

                  <div className="space-y-6">
                    {cart.map((item, index) => (
                      <AnimatedSection key={item.product.id} delay={0.1 * index}>
                        <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-gold/30 transition-colors">
                          <img
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />

                          <div className="flex-1">
                            <h3 className="font-semibold text-charcoal mb-2">{item.product.name}</h3>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded-full">
                                {item.product.size}
                              </span>
                              <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded-full">
                                {item.product.tone} Tone
                              </span>
                              {item.product.musicalNote && (
                                <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded-full">
                                  {item.product.musicalNote}
                                </span>
                              )}
                            </div>
                            <p className="text-lg font-bold text-gold">${item.product.price.toFixed(2)}</p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-12 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          {/* Item Total */}
                          <div className="text-right">
                            <p className="font-semibold text-charcoal">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="mt-2 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Remove item"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <AnimatedSection delay={0.2}>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
                  <h2 className="text-xl font-semibold text-charcoal mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-charcoal/80">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-charcoal/80">
                      <span>Delivery</span>
                      <span>
                        {deliveryCharge === 0 ? (
                          <span className="text-green-600 font-medium">Free</span>
                        ) : (
                          `$${deliveryCharge.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-charcoal/80">
                      <span>Tax (13%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-lg font-semibold text-charcoal">
                        <span>Total</span>
                        <span>${finalTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Free Shipping Notice */}
                  {totalPrice < 100 && (
                    <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-700">
                        Add ${(100 - totalPrice).toFixed(2)} more for free shipping!
                      </p>
                    </div>
                  )}

                  {totalPrice >= 100 && (
                    <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-700 font-medium">🎉 You qualify for free shipping!</p>
                    </div>
                  )}

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gold hover:bg-gold/90 text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
                  >
                    {user ? "Proceed to Checkout" : "Login to Checkout"}
                    <ArrowRight size={18} className="ml-2" />
                  </button>

                  <p className="text-xs text-charcoal/60 text-center mt-4">Secure checkout with SSL encryption</p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage