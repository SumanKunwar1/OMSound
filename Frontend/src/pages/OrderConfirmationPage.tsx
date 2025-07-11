"use client"

import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import {
  CheckCircle,
  Package,
  Truck,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Download,
  Share2,
  AlertCircle,
} from "lucide-react"
import SEOHelmet from "../components/seo/SEOHelmet"
import { useAuth } from "../context/AuthContext"
import { useOrder } from "../context/OrderContext"
import AnimatedSection from "../components/utils/AnimatedSection"
// Removed 'import axios from "axios"' to resolve the "value is never read" warning

interface Order {
  _id: string
  userId: string
  items: Array<{
    productId: string
    productName: string
    productImage: string
    quantity: number
    price: number
  }>
  shippingAddress: {
    firstName: string
    lastName: string
    email: string
    phone: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  paymentMethod: "cod" | "paypal"
  subtotal: number
  deliveryCharge: number
  tax: number
  totalAmount: number
  status: string
  orderDate: string
  estimatedDelivery: string
  trackingNumber?: string
}

const OrderConfirmationPage = () => {
  const { orderId } = useParams<{ orderId: string }>()
  const { user } = useAuth()
  const { getOrder } = useOrder()
  const navigate = useNavigate()
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      navigate("/login")
      return
    }

    if (!orderId) {
      navigate("/dashboard")
      return
    }

    const fetchOrder = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const orderData = await getOrder(orderId)
        setOrder(orderData)
      } catch (err: any) {
        console.error("Failed to fetch order:", err)
        // Check if it's an Axios error and specifically a timeout
        if (
          err &&
          typeof err === "object" &&
          "isAxiosError" in err &&
          err.isAxiosError &&
          err.code === "ECONNABORTED"
        ) {
          setError(
            "Failed to load order details: The request timed out. Please check your internet connection or try again later.",
          )
        } else if (err.response?.status === 404) {
          setError("Order not found. It might have been cancelled or never existed.")
        } else if (err.response?.status === 401 || err.response?.status === 403) {
          setError("You are not authorized to view this order. Please log in with the correct account.")
        } else {
          setError(err.message || "Failed to load order details. Please try again.")
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrder()
  }, [orderId, user, navigate, getOrder])

  const handleDownloadInvoice = () => {
    if (!order) return

    // Create a simple invoice content
    const invoiceContent = `
INVOICE - OMSound Nepal
Order ID: ${order._id}
Date: ${new Date(order.orderDate).toLocaleDateString()}

BILLING TO:
${order.shippingAddress.firstName} ${order.shippingAddress.lastName}
${order.shippingAddress.street}
${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}
${order.shippingAddress.country}
Email: ${order.shippingAddress.email}
Phone: ${order.shippingAddress.phone}

ITEMS:
${order.items
  .map(
    (item) =>
      `${item.productName} - Qty: ${item.quantity} - $${item.price.toFixed(2)} each - Total: $${(item.price * item.quantity).toFixed(2)}`,
  )
  .join("\n")}

SUMMARY:
Subtotal: $${order.subtotal.toFixed(2)}
Delivery: ${order.deliveryCharge === 0 ? "Free" : `$${order.deliveryCharge.toFixed(2)}`}
Tax: $${order.tax.toFixed(2)}
Total: $${order.totalAmount.toFixed(2)}

Payment Method: ${order.paymentMethod === "cod" ? "Cash on Delivery" : "PayPal"}
Status: ${order.status}

Thank you for your business!
    `

    const element = document.createElement("a")
    const file = new Blob([invoiceContent], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `invoice-${orderId}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleShareOrder = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Order Confirmation - ${orderId}`,
          text: `I just ordered some amazing singing bowls from OMSound Nepal!`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href)
        alert("Order link copied to clipboard!")
      } catch (error) {
        console.log("Failed to copy to clipboard:", error)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 bg-gray-50 flex items-center justify-center">
        <SEOHelmet
          title="Loading Order | OMSound Nepal"
          description="Loading your order confirmation"
          noindex={true}
          keywords=""
        />
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-charcoal">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen pt-24 bg-gray-50 flex items-center justify-center">
        <SEOHelmet
          title="Order Not Found | OMSound Nepal"
          description="Order confirmation not found"
          noindex={true}
          keywords=""
        />
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={40} className="text-red-600" />
          </div>
          <h2 className="text-2xl font-serif text-charcoal mb-4">
            {error ? "Error Loading Order" : "Order Not Found"}
          </h2>
          <p className="text-charcoal/70 mb-6">{error || "We couldn't find the order you're looking for."}</p>
          <div className="space-y-3">
            <Link
              to="/dashboard"
              className="block w-full bg-gold text-white py-3 px-6 rounded-lg hover:bg-gold/90 transition-colors"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/shop"
              className="block w-full bg-gray-100 text-charcoal py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <SEOHelmet
        title={`Order Confirmation - ${orderId} | OMSound Nepal`}
        description="Your order has been confirmed. Thank you for choosing OMSound Nepal."
        noindex={true}
        keywords=""
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Success Header */}
        <AnimatedSection>
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-serif text-charcoal mb-2">Order Confirmed!</h1>
            <p className="text-charcoal/70 text-lg">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
            <div className="mt-4 p-4 bg-gold/10 border border-gold/20 rounded-lg inline-block">
              <p className="text-gold font-semibold">Order ID: #{orderId}</p>
            </div>
          </div>
        </AnimatedSection>

        {/* Order Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Order Information */}
          <AnimatedSection delay={0.1}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-charcoal mb-4 flex items-center">
                <Package size={20} className="mr-2 text-gold" />
                Order Information
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-charcoal/70">Order Date:</span>
                  <span className="text-charcoal font-medium">{new Date(order.orderDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/70">Payment Method:</span>
                  <span className="text-charcoal font-medium capitalize">
                    {order.paymentMethod === "cod" ? "Cash on Delivery" : "PayPal"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/70">Status:</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/70">Estimated Delivery:</span>
                  <span className="text-charcoal font-medium">
                    {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-lg font-semibold text-charcoal">
                  <span>Total Amount:</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Shipping Address */}
          <AnimatedSection delay={0.2}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-charcoal mb-4 flex items-center">
                <MapPin size={20} className="mr-2 text-gold" />
                Shipping Address
              </h2>

              <div className="space-y-2 text-charcoal/80">
                <p className="font-medium text-charcoal">
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                </p>
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
                <div className="pt-2 border-t border-gray-200 mt-4">
                  <div className="flex items-center mb-1">
                    <Mail size={16} className="mr-2 text-charcoal/60" />
                    <span className="text-sm">{order.shippingAddress.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone size={16} className="mr-2 text-charcoal/60" />
                    <span className="text-sm">{order.shippingAddress.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Order Items */}
        <AnimatedSection delay={0.3}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-charcoal mb-4">Order Items</h2>

            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  <img
                    src={item.productImage || "/placeholder.svg"}
                    alt={item.productName}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-charcoal">{item.productName}</h3>
                    <p className="text-charcoal/70 text-sm">Quantity: {item.quantity}</p>
                    <p className="text-gold font-medium">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-charcoal">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-charcoal/70">Subtotal:</span>
                  <span className="text-charcoal">${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/70">Delivery:</span>
                  <span className="text-charcoal">
                    {order.deliveryCharge === 0 ? "Free" : `$${order.deliveryCharge.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/70">Tax:</span>
                  <span className="text-charcoal">${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-charcoal pt-2 border-t border-gray-200">
                  <span>Total:</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Next Steps */}
        <AnimatedSection delay={0.4}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-charcoal mb-4">What's Next?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package size={24} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-charcoal mb-2">Order Processing</h3>
                <p className="text-sm text-charcoal/70">We'll prepare your items with care and attention to detail.</p>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Truck size={24} className="text-yellow-600" />
                </div>
                <h3 className="font-semibold text-charcoal mb-2">Shipping</h3>
                <p className="text-sm text-charcoal/70">Your order will be shipped within 2-3 business days.</p>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle size={24} className="text-green-600" />
                </div>
                <h3 className="font-semibold text-charcoal mb-2">Delivery</h3>
                <p className="text-sm text-charcoal/70">Enjoy your authentic Himalayan singing bowls!</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Action Buttons */}
        <AnimatedSection delay={0.5}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownloadInvoice}
              className="flex items-center justify-center px-6 py-3 bg-gray-100 text-charcoal rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Download size={18} className="mr-2" />
              Download Invoice
            </button>

            <button
              onClick={handleShareOrder}
              className="flex items-center justify-center px-6 py-3 bg-gold/20 text-gold rounded-lg hover:bg-gold/30 transition-colors"
            >
              <Share2 size={18} className="mr-2" />
              Share Order
            </button>

            <Link
              to="/dashboard"
              className="flex items-center justify-center px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors"
            >
              View Dashboard
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </AnimatedSection>

        {/* Contact Support */}
        <AnimatedSection delay={0.6}>
          <div className="mt-8 text-center p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-charcoal mb-2">Need Help?</h3>
            <p className="text-charcoal/70 mb-4">
              If you have any questions about your order, our customer support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@omsoundnepal.com"
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Mail size={16} className="mr-2" />
                Email Support
              </a>
              <a
                href="tel:+977-1-234-5678"
                className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Phone size={16} className="mr-2" />
                Call Support
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}

export default OrderConfirmationPage
