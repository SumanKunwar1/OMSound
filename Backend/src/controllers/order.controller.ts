import type { Request, Response, NextFunction } from "express"
import mongoose from "mongoose"
import Order, { type IOrder } from "../models/order.model"
import { ErrorResponse } from "../utils/errorResponse"

const OrderStatusValues = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
} as const

// Create a demo ObjectId that we'll reuse for all demo orders
const DEMO_USER_ID = new mongoose.Types.ObjectId("507f1f77bcf86cd799439011")

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      orderItems,
      items,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      subtotal,
      taxPrice,
      tax,
      shippingPrice,
      deliveryCharge,
      totalPrice,
      totalAmount,
      userId,
    } = req.body

    const finalItems = orderItems || items

    if (!finalItems || finalItems.length === 0) {
      return next(new ErrorResponse("No order items", 400))
    }

    // Use the actual user ID if provided, otherwise use demo ID
    const finalUserId =
      userId && mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : DEMO_USER_ID

    const order = new Order({
      userId: finalUserId,
      items: finalItems,
      shippingAddress,
      paymentMethod,
      subtotal: subtotal || itemsPrice || 0,
      tax: tax || taxPrice || 0,
      deliveryCharge: deliveryCharge || shippingPrice || 0,
      totalAmount: totalAmount || totalPrice || 0,
      status: OrderStatusValues.PENDING,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })

    const createdOrder = await order.save()

    const transformedOrder = {
      id: createdOrder._id.toString(),
      userId: createdOrder.userId,
      items: createdOrder.items,
      shippingAddress: createdOrder.shippingAddress,
      paymentMethod: createdOrder.paymentMethod,
      subtotal: createdOrder.subtotal,
      deliveryCharge: createdOrder.deliveryCharge,
      tax: createdOrder.tax,
      totalAmount: createdOrder.totalAmount,
      status: createdOrder.status,
      orderDate: createdOrder.createdAt,
      estimatedDelivery: createdOrder.estimatedDelivery,
      isPaid: createdOrder.isPaid || false,
      paidAt: createdOrder.paidAt,
      isDelivered: createdOrder.isDelivered || false,
      deliveredAt: createdOrder.deliveredAt,
      trackingNumber: createdOrder.trackingNumber,
    }

    res.status(201).json(transformedOrder)
  } catch (error) {
    console.error("Create order error:", error)
    next(error)
  }
}

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findById(req.params.id).populate("userId", "firstName lastName email")

    if (!order) {
      return next(new ErrorResponse("Order not found", 404))
    }

    res.json(order)
  } catch (error) {
    next(error)
  }
}

export const updateOrderToPaid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return next(new ErrorResponse("Order not found", 404))
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status: OrderStatusValues.PROCESSING,
          isPaid: true,
          paidAt: new Date(),
          paymentResult: {
            id: req.body.id || "demo-payment",
            status: req.body.status || "completed",
            update_time: req.body.update_time || new Date().toISOString(),
            email_address: req.body.payer?.email_address || "demo@example.com",
          },
        },
      },
      { new: true },
    )

    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
}

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, trackingNumber } = req.body

    if (!Object.values(OrderStatusValues).includes(status)) {
      return next(new ErrorResponse("Invalid order status", 400))
    }

    const order = await Order.findById(req.params.id)

    if (!order) {
      return next(new ErrorResponse("Order not found", 404))
    }

    // Simplified - allow any status change for demo purposes
    const updateData: Partial<IOrder> = {
      status,
    }

    if (status === OrderStatusValues.SHIPPED && trackingNumber) {
      updateData.trackingNumber = trackingNumber
    }

    if (status === OrderStatusValues.DELIVERED) {
      updateData.deliveredAt = new Date()
      updateData.isDelivered = true
    }

    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true })

    // Transform response to match frontend expectations
    const transformedOrder = {
      id: updatedOrder!._id.toString(),
      userId: updatedOrder!.userId,
      items: updatedOrder!.items,
      shippingAddress: updatedOrder!.shippingAddress,
      paymentMethod: updatedOrder!.paymentMethod,
      subtotal: updatedOrder!.subtotal,
      deliveryCharge: updatedOrder!.deliveryCharge,
      tax: updatedOrder!.tax,
      totalAmount: updatedOrder!.totalAmount,
      status: updatedOrder!.status,
      orderDate: updatedOrder!.createdAt,
      estimatedDelivery: updatedOrder!.estimatedDelivery,
      isPaid: updatedOrder!.isPaid,
      paidAt: updatedOrder!.paidAt,
      isDelivered: updatedOrder!.isDelivered,
      deliveredAt: updatedOrder!.deliveredAt,
      trackingNumber: updatedOrder!.trackingNumber,
    }

    res.json(transformedOrder)
  } catch (error) {
    next(error)
  }
}

export const getMyOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.query.userId

    if (!userId) {
      return next(new ErrorResponse("User ID is required", 400))
    }

    console.log("Fetching orders for user:", userId)

    // Try to find orders by userId (could be string or ObjectId)
    let orders: IOrder[]

    if (mongoose.Types.ObjectId.isValid(userId as string)) {
      // If it's a valid ObjectId, search by ObjectId
      orders = await Order.find({ userId: new mongoose.Types.ObjectId(userId as string) }).sort({ createdAt: -1 })
    } else {
      // If it's not a valid ObjectId, search by string
      orders = await Order.find({ userId: userId }).sort({ createdAt: -1 })
    }

    console.log(`Found ${orders.length} orders for user ${userId}`)

    // Transform the data to match frontend expectations
    const transformedOrders = orders.map((order: IOrder) => ({
      id: order._id.toString(),
      userId: order.userId,
      items: order.items,
      shippingAddress: order.shippingAddress,
      paymentMethod: order.paymentMethod,
      subtotal: order.subtotal,
      deliveryCharge: order.deliveryCharge,
      tax: order.tax,
      totalAmount: order.totalAmount,
      status: order.status,
      orderDate: order.createdAt,
      estimatedDelivery: order.estimatedDelivery,
      isPaid: order.isPaid || false,
      paidAt: order.paidAt,
      isDelivered: order.isDelivered || false,
      deliveredAt: order.deliveredAt,
      trackingNumber: order.trackingNumber,
    }))

    res.json(transformedOrders)
  } catch (error) {
    console.error("Get my orders error:", error)
    next(error)
  }
}

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await Order.find({}).populate("userId", "firstName lastName email").sort({ createdAt: -1 })

    // Transform the data to match frontend expectations
    const transformedOrders = orders.map((order: IOrder) => ({
      id: order._id.toString(),
      userId: order.userId,
      items: order.items,
      shippingAddress: order.shippingAddress,
      paymentMethod: order.paymentMethod,
      subtotal: order.subtotal,
      deliveryCharge: order.deliveryCharge,
      tax: order.tax,
      totalAmount: order.totalAmount,
      status: order.status,
      orderDate: order.createdAt,
      estimatedDelivery: order.estimatedDelivery,
      isPaid: order.isPaid || false,
      paidAt: order.paidAt,
      isDelivered: order.isDelivered || false,
      deliveredAt: order.deliveredAt,
      trackingNumber: order.trackingNumber,
    }))

    res.json(transformedOrders)
  } catch (error) {
    next(error)
  }
}

export const cancelOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return next(new ErrorResponse("Order not found", 404))
    }

    // Simplified - allow cancellation from any status for demo
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: { status: OrderStatusValues.CANCELLED } },
      { new: true },
    )

    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
}

export const getOrdersByStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.params

    if (!Object.values(OrderStatusValues).includes(status as any)) {
      return next(new ErrorResponse("Invalid order status", 400))
    }

    const orders = await Order.find({ status }).populate("userId", "firstName lastName email").sort({ createdAt: -1 })

    res.json(orders)
  } catch (error) {
    next(error)
  }
}
