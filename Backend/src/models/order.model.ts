import mongoose, { type Document, Schema } from "mongoose"

export interface IOrderItem {
  productId: string
  productName: string
  productImage: string
  quantity: number
  price: number
  size?: string
  tone?: string
}

export interface IShippingAddress {
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
export type PaymentMethod = "cod" | "paypal"

export interface IPaymentResult {
  id: string
  status: string
  update_time: string
  email_address: string
}

// Explicit interface for Order document with _id properly typed
export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId // Explicitly define _id type
  userId: mongoose.Types.ObjectId
  items: IOrderItem[]
  shippingAddress: IShippingAddress
  paymentMethod: PaymentMethod
  subtotal: number
  deliveryCharge: number
  tax: number
  totalAmount: number
  status: OrderStatus
  orderDate: Date
  estimatedDelivery: Date
  trackingNumber?: string
  paymentResult?: IPaymentResult
  paidAt?: Date
  isPaid?: boolean
  deliveredAt?: Date
  isDelivered?: boolean
  createdAt: Date
  updatedAt: Date
}

const orderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    items: [
      {
        productId: { type: String, required: [true, "Product ID is required"] },
        productName: { type: String, required: [true, "Product name is required"] },
        productImage: { type: String, required: [true, "Product image is required"] },
        quantity: { type: Number, required: [true, "Quantity is required"], min: 1 },
        price: { type: Number, required: [true, "Price is required"], min: 0 },
        size: { type: String },
        tone: { type: String },
      },
    ],
    shippingAddress: {
      firstName: { type: String, required: [true, "First name is required"] },
      lastName: { type: String, required: [true, "Last name is required"] },
      email: { type: String, required: [true, "Email is required"] },
      phone: { type: String, required: [true, "Phone is required"] },
      street: { type: String, required: [true, "Street is required"] },
      city: { type: String, required: [true, "City is required"] },
      state: { type: String, required: [true, "State is required"] },
      zipCode: { type: String, required: [true, "ZIP code is required"] },
      country: { type: String, required: [true, "Country is required"] },
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "paypal"],
      required: [true, "Payment method is required"],
    },
    subtotal: { type: Number, required: [true, "Subtotal is required"], min: 0 },
    deliveryCharge: { type: Number, required: [true, "Delivery charge is required"], min: 0 },
    tax: { type: Number, required: [true, "Tax is required"], min: 0 },
    totalAmount: { type: Number, required: [true, "Total amount is required"], min: 0 },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    orderDate: { type: Date, default: Date.now },
    estimatedDelivery: { type: Date, required: [true, "Estimated delivery is required"] },
    trackingNumber: { type: String },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    paidAt: { type: Date },
    isPaid: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
  },
  { timestamps: true },
)

// Add indexes for better performance
orderSchema.index({ userId: 1 })
orderSchema.index({ status: 1 })
orderSchema.index({ orderDate: -1 })
orderSchema.index({ createdAt: -1 })

const Order = mongoose.model<IOrder>("Order", orderSchema)
export default Order
