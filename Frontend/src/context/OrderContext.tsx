"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "./AuthContext"
import axios from "axios"
import { API_URL } from "../config"

interface OrderItem {
  productId: string
  productName: string
  productImage: string
  quantity: number
  price: number
  size?: string
  tone?: string
}

interface ShippingAddress {
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

interface Order {
  _id: string
  userId: string
  items: OrderItem[]
  shippingAddress: ShippingAddress
  paymentMethod: "cod" | "paypal"
  subtotal: number
  deliveryCharge: number
  tax: number
  totalAmount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  orderDate: string
  estimatedDelivery: string
  isPaid?: boolean
  paidAt?: string
  isDelivered?: boolean
  deliveredAt?: string
  trackingNumber?: string
}

interface CreateOrderData {
  // userId is no longer part of this interface, it's added internally
  items: OrderItem[]
  shippingAddress: ShippingAddress
  paymentMethod: "cod" | "paypal"
  subtotal: number
  deliveryCharge: number
  tax: number
  totalAmount: number
}

interface OrderContextType {
  orders: Order[]
  createOrder: (orderData: CreateOrderData) => Promise<string>
  getOrder: (orderId: string) => Promise<Order>
  // getUserOrders is removed as it's no longer used by DashboardPage
  loading: boolean
  error: string | null
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function useOrder() {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider")
  }
  return context
}

interface OrderProviderProps {
  children: ReactNode
}

function OrderProvider({ children }: OrderProviderProps) {
  const { user, token } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Create axios instance with interceptors
  const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 30000, // Increased timeout to 30 seconds
    headers: {
      "Content-Type": "application/json",
    },
  })

  // Add request interceptor to include auth token
  axiosInstance.interceptors.request.use(
    (config) => {
      console.log(`Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`)

      if (!config.headers) {
        config.headers = {}
      }

      if (token) {
        ;(config.headers as Record<string, string>).Authorization = `Bearer ${token}`
        console.log("Authorization header added:", `Bearer ${token.substring(0, 20)}...`)
      } else {
        console.warn("No token available for request")
      }

      return config
    },
    (error) => {
      console.error("Request interceptor error:", error)
      return Promise.reject(error)
    },
  )

  // Add response interceptor for error handling
  axiosInstance.interceptors.response.use(
    (response) => {
      console.log(`Response received:`, response.status, response.statusText)
      return response
    },
    (error) => {
      console.error("Response error:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      })

      // Check if it's an Axios error and specifically a timeout
      if (
        error &&
        typeof error === "object" &&
        "isAxiosError" in error &&
        error.isAxiosError &&
        error.code === "ECONNABORTED"
      ) {
        console.error("Request timed out:", error.message)
        error.message = "Request timed out. Please check your internet connection or try again later."
      } else if (error.response?.status === 401) {
        const errorCode = error.response?.data?.code
        switch (errorCode) {
          case "NO_TOKEN":
            console.error("No authentication token provided")
            break
          case "INVALID_TOKEN":
            console.error("Invalid authentication token")
            break
          case "TOKEN_EXPIRED":
            console.error("Authentication token has expired")
            break
          case "AUTH_FAILED":
            console.error("Authentication failed")
            break
          default:
            console.error("Authentication error:", error.response?.data?.error)
        }
      }

      return Promise.reject(error)
    },
  )

  // This useEffect is responsible for fetching orders for the current user
  // It will run when `user` or `token` changes.
  useEffect(() => {
    const fetchOrders = async () => {
      if (user && token) {
        try {
          setLoading(true)
          setError(null)
          console.log("Fetching user orders from OrderContext useEffect...")
          // Pass userId as a query parameter
          const response = await axiosInstance.get<Order[]>(`/orders/myorders?userId=${user._id}`)
          console.log("Orders fetched successfully in OrderContext:", response.data.length, "orders")
          setOrders(response.data)
        } catch (err: any) {
          let errorMessage = err.response?.data?.error || err.response?.data?.message || "Failed to fetch orders"
          if (
            err &&
            typeof err === "object" &&
            "isAxiosError" in err &&
            err.isAxiosError &&
            err.code === "ECONNABORTED"
          ) {
            errorMessage = "Request timed out. Please check your internet connection or try again later."
          }
          setError(errorMessage)
          console.error("Fetch orders error in OrderContext:", err)
        } finally {
          setLoading(false)
        }
      } else {
        // Clear orders if user or token is not available (e.g., after logout)
        setOrders([])
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user, token]) // Depend on user and token to re-fetch when they change

  const createOrder = async (orderData: CreateOrderData): Promise<string> => {
    if (!token) {
      throw new Error("Authentication required")
    }

    if (!user?._id) {
      // Ensure user and _id exist
      throw new Error("User ID not found. Please log in.")
    }

    try {
      setLoading(true)
      setError(null)

      // Transform the order data to match backend expectations
      // Add userId from the authenticated user here
      const transformedOrderData = {
        userId: user._id, // Add the user ID from the AuthContext
        orderItems: orderData.items,
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod,
        itemsPrice: orderData.subtotal,
        shippingPrice: orderData.deliveryCharge,
        taxPrice: orderData.tax,
        totalPrice: orderData.totalAmount,
      }

      console.log("Creating order with transformed data:", transformedOrderData)
      console.log("Using token:", token ? `${token.substring(0, 20)}...` : "No token")

      const response = await axiosInstance.post<Order>("/orders", transformedOrderData)
      const newOrder = response.data

      console.log("Order created successfully:", newOrder._id)
      // Update local state with the newly created order
      setOrders((prev) => [newOrder, ...prev])
      return newOrder._id
    } catch (err: any) {
      let errorMessage = "Failed to create order"

      if (err && typeof err === "object" && "isAxiosError" in err && err.isAxiosError && err.code === "ECONNABORTED") {
        errorMessage = "Request timed out. Please check your internet connection or try again later."
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message
      } else if (err.message) {
        errorMessage = err.message
      }

      setError(errorMessage)
      console.error("Create order error:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        code: err.response?.data?.code,
      })
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const getOrder = async (orderId: string): Promise<Order> => {
    if (!token) {
      throw new Error("Authentication required")
    }

    try {
      setLoading(true)
      setError(null)
      console.log("Fetching order:", orderId)
      const response = await axiosInstance.get<Order>(`/orders/${orderId}`)
      console.log("Order fetched successfully:", response.data._id)
      return response.data
    } catch (err: any) {
      let errorMessage = "Failed to fetch order"
      if (err && typeof err === "object" && "isAxiosError" in err && err.isAxiosError && err.code === "ECONNABORTED") {
        errorMessage = "Request timed out. Please check your internet connection or try again later."
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message
      } else if (err.message) {
        errorMessage = err.message
      }
      setError(errorMessage)
      console.error("Get order error:", err)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Removed getUserOrders as it's no longer used by DashboardPage
  // The DashboardPage now fetches directly from the API.

  const value: OrderContextType = {
    orders,
    createOrder,
    getOrder,
    loading,
    error,
  }

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export default OrderProvider
