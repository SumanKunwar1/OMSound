// routes/product.routes.ts
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
  console.log(`${req.method} ${req.path}`)
  console.log("Headers:", req.headers)
  next()
})

// Public routes
router.get("/shop", asyncHandler(getProductsForShop))
router.get("/:id", asyncHandler(getProductById)) // This will handle both MongoDB _id and custom id

// Admin routes - Make sure these come after the specific routes
router.get("/", asyncHandler(getProducts))

// Add specific logging for POST route
router.post(
  "/",
  (req, res, next) => {
    console.log("POST /products - Before multer")
    next()
  },
  uploadFiles,
  (req, res, next) => {
    console.log("POST /products - After multer")
    console.log("Body:", req.body)
    console.log("Files:", req.files)
    next()
  },
  asyncHandler(createProduct),
)

router.put("/:id", uploadFiles, asyncHandler(updateProduct))
router.delete("/:id", asyncHandler(deleteProduct))

export default router
