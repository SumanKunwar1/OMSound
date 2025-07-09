"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useAuth } from "./AuthContext"

interface OrderItem {
  productId: string
  productName: string
  productImage: string
  quantity: number
  price: number
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
  id: string
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
}

interface CreateOrderData {
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
  getUserOrders: (userId: string) => Order[]
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
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const savedOrders = localStorage.getItem("orders")
      return savedOrders ? JSON.parse(savedOrders) : []
    } catch (error) {
      console.error("Error loading orders from localStorage:", error)
      return []
    }
  })

  const createOrder = async (orderData: CreateOrderData): Promise<string> => {
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const orderDate = new Date().toISOString()
    const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()

    const newOrder: Order = {
      id: orderId,
      userId: user?._id || "guest",
      ...orderData,
      status: "pending",
      orderDate,
      estimatedDelivery,
    }

    setOrders(prev => {
      const updatedOrders = [...prev, newOrder]
      localStorage.setItem("orders", JSON.stringify(updatedOrders))
      return updatedOrders
    })
    
    return orderId
  }

  const getOrder = async (orderId: string): Promise<Order> => {
    const order = orders.find(o => o.id === orderId)
    
    if (!order) {
      throw new Error("Order not found")
    }

    return order
  }

  const getUserOrders = (userId: string): Order[] => {
    return orders.filter(order => order.userId === userId)
  }

  const value = {
    orders,
    createOrder,
    getOrder,
    getUserOrders,
  }

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export default OrderProvider