import express from "express"
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsForShop,
} from "../controllers/product.controller"
import { uploadFiles } from "../utils/multer"
import { asyncHandler } from "../utils/asyncHandler.utils"

const router = express.Router()

// Add logging middleware
router.use((req, res, next) => {
  console.log(`[PRODUCT] ${req.method} ${req.path}`)
  next()
})

// Public routes
router.get("/shop", asyncHandler(getProductsForShop))
router.get("/:id", asyncHandler(getProductById))

// Admin routes - Ensure GET / comes after specific routes
router.get("/", asyncHandler(getProducts))

// POST route with multer and specific error handling
router.post(
  "/",
  (req, res, next) => {
    console.log("[PRODUCT] POST - Starting file upload")
    next()
  },
  uploadFiles,
  (req, res, next) => {
    console.log("[PRODUCT] POST - Files received:", {
      images: (req.files as any)?.images?.length || 0,
      video: (req.files as any)?.video?.length || 0,
      fields: Object.keys(req.body),
    })
    next()
  },
  asyncHandler(createProduct),
)

// PUT route with multer
router.put(
  "/:id",
  (req, res, next) => {
    console.log(`[PRODUCT] PUT ${req.params.id} - Starting file upload`)
    next()
  },
  uploadFiles,
  asyncHandler(updateProduct),
)

// DELETE route
router.delete("/:id", asyncHandler(deleteProduct))

export default router