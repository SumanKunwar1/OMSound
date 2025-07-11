// Centralized Order Type Definitions

export interface OrderItem {
  productId: string
  productName: string
  productImage: string
  quantity: number
  price: number
  size?: string
  tone?: string
}

export interface ShippingAddress {
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

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"

export interface Order {
  id: string // Changed from _id to id to match backend response
  userId: string
  items: OrderItem[]
  shippingAddress: ShippingAddress
  paymentMethod: "cod" | "paypal"
  subtotal: number
  deliveryCharge: number
  tax: number
  totalAmount: number
  status: OrderStatus // Use the specific OrderStatus type
  orderDate: string
  estimatedDelivery: string
  trackingNumber?: string
  isPaid?: boolean
  paidAt?: string
  isDelivered?: boolean
  deliveredAt?: string
}
