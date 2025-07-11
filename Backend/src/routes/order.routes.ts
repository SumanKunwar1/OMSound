import { Router } from "express"
import {
  createOrder,
  getOrders,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  updateOrderToPaid,
  cancelOrder,
  getOrdersByStatus,
} from "../controllers/order.controller"

const router = Router()

// All routes are now public - no authentication required
router.post("/", createOrder)
router.get("/myorders", getMyOrders)
router.get("/admin", getOrders) // This is what your frontend calls
router.get("/", getOrders) // Keep for backward compatibility
router.get("/:id", getOrderById)
router.put("/:id/pay", updateOrderToPaid)
router.put("/:id/cancel", cancelOrder)
router.put("/:id/status", updateOrderStatus) // No admin check needed
router.get("/status/:status", getOrdersByStatus)

export default router
