// routes/review.routes.ts
import { Router } from "express" 
import {
  createReview,
  getReviewsByProductId,
  getReviewsByUserId,
  getReviewById,
  updateReview,
  deleteReview,
  getReviewStatsForProduct,
} from "../controllers/review.controller"

const router = Router() 
router.get("/product/:productId", getReviewsByProductId)
router.get("/user/:userId", getReviewsByUserId)
router.get("/stats/:productId", getReviewStatsForProduct)
router.get("/:id", getReviewById)
router.post("/", createReview)
router.put("/:id", updateReview)
router.delete("/:id", deleteReview)

export default router 
