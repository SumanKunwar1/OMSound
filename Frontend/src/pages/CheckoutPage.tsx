// CheckoutPage.tsx
"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CreditCard, Truck, MapPin, Check } from "lucide-react"
import SEOHelmet from "../components/seo/SEOHelmet"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import { useOrder } from "../context/OrderContext"
import AnimatedSection from "../components/utils/AnimatedSection"

const CheckoutPage = () => {
  const { user } = useAuth()
  const { cart, totalPrice, clearCart } = useCart()
  const { createOrder } = useOrder()
  const navigate = useNavigate()

  const [shippingAddress, setShippingAddress] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Nepal",
  })

  const [selectedPayment, setSelectedPayment] = useState<"cod" | "paypal">("cod")
  const [isProcessing, setIsProcessing] = useState(false)

  // Calculate totals
  const subtotal = totalPrice
  const deliveryCharge = subtotal >= 100 ? 0 : 15
  const tax = subtotal * 0.13
  const total = subtotal + deliveryCharge + tax

  const handlePlaceOrder = async () => {
    setIsProcessing(true)

    try {
      const orderData = {
        items: cart.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          productImage: item.product.image,
          quantity: item.quantity,
          price: item.product.price,
        })),
        shippingAddress,
        paymentMethod: selectedPayment,
        subtotal,
        deliveryCharge,
        tax,
        totalAmount: total,
      }

      const orderId = await createOrder(orderData)
      clearCart()
      navigate(`/order-confirmation/${orderId}`)
    } catch (error) {
      console.error("Order placement failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <SEOHelmet
        title="Checkout | OMSound Nepal"
        description="Complete your purchase of authentic Himalayan singing bowls"
        noindex={true}
        keywords=""
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-charcoal">Checkout</h1>
          <p className="text-charcoal/70 mt-2">Complete your order details</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address */}
            <AnimatedSection>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center mr-3">
                    <MapPin size={16} className="text-gold" />
                  </div>
                  <h2 className="text-xl font-semibold text-charcoal">Shipping Address</h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">First Name *</label>
                      <input
                        type="text"
                        value={shippingAddress.firstName}
                        onChange={(e) => setShippingAddress({...shippingAddress, firstName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Last Name *</label>
                      <input
                        type="text"
                        value={shippingAddress.lastName}
                        onChange={(e) => setShippingAddress({...shippingAddress, lastName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Email Address *</label>
                      <input
                        type="email"
                        value={shippingAddress.email}
                        onChange={(e) => setShippingAddress({...shippingAddress, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Street Address *</label>
                    <input
                      type="text"
                      value={shippingAddress.street}
                      onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="Enter street address"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">City *</label>
                      <input
                        type="text"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                        placeholder="Enter city"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">State *</label>
                      <input
                        type="text"
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                        placeholder="Enter state"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">ZIP Code *</label>
                      <input
                        type="text"
                        value={shippingAddress.zipCode}
                        onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                        placeholder="Enter ZIP code"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Country *</label>
                    <select
                      value={shippingAddress.country}
                      onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    >
                      <option value="Nepal">Nepal</option>
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Payment Method */}
            <AnimatedSection delay={0.1}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center mr-3">
                    <CreditCard size={16} className="text-gold" />
                  </div>
                  <h2 className="text-xl font-semibold text-charcoal">Payment Method</h2>
                </div>

                <div className="space-y-4">
                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedPayment === "cod"
                        ? "border-gold bg-gold/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedPayment("cod")}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={selectedPayment === "cod"}
                        onChange={() => setSelectedPayment("cod")}
                        className="w-4 h-4 text-gold border-gray-300 focus:ring-gold"
                      />
                      <div className="ml-3">
                        <p className="font-medium text-charcoal">Cash on Delivery</p>
                        <p className="text-sm text-charcoal/70">Pay when your order is delivered</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedPayment === "paypal"
                        ? "border-gold bg-gold/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedPayment("paypal")}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked={selectedPayment === "paypal"}
                        onChange={() => setSelectedPayment("paypal")}
                        className="w-4 h-4 text-gold border-gray-300 focus:ring-gold"
                      />
                      <div className="ml-3">
                        <p className="font-medium text-charcoal">PayPal</p>
                        <p className="text-sm text-charcoal/70">Pay securely with your PayPal account</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <AnimatedSection delay={0.2}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center mr-3">
                    <Check size={16} className="text-gold" />
                  </div>
                  <h2 className="text-xl font-semibold text-charcoal">Order Summary</h2>
                </div>

                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <img
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-charcoal text-sm">{item.product.name}</h3>
                        <p className="text-charcoal/70 text-xs">
                          {item.product.size} • {item.product.tone}
                        </p>
                        <p className="text-charcoal/70 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-charcoal">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                {/* Order Totals */}
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between text-charcoal/80">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-charcoal/80">
                    <span>Delivery</span>
                    <span>{deliveryCharge === 0 ? "Free" : `$${deliveryCharge.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-charcoal/80">
                    <span>Tax (13%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-semibold text-charcoal">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Free Shipping Notice */}
                {subtotal >= 100 && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <Truck size={16} className="text-green-600 mr-2" />
                      <p className="text-sm text-green-700">You qualify for free shipping!</p>
                    </div>
                  </div>
                )}

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full mt-6 bg-gold hover:bg-gold/90 text-white py-4 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing Order...
                    </>
                  ) : (
                    <>
                      <Check size={18} className="mr-2" />
                      Place Order - ${total.toFixed(2)}
                    </>
                  )}
                </button>

                <p className="text-xs text-charcoal/60 text-center mt-4">
                  By placing your order, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage