import express, { type Request, type Response, type NextFunction, type Express } from "express"
import cors from "cors"
import mongoose from "mongoose"
import multer, { type FileFilterCallback } from "multer"
import dotenv from "dotenv"

dotenv.config()

console.log("=== SERVER STARTUP ===")
console.log("Environment variables:")
console.log("MONGO_URI:", process.env.MONGO_URI ? "Set" : "Not set")
console.log("PORT:", process.env.PORT || 5000)
console.log("CORS_ORIGIN:", process.env.CORS_ORIGIN || "http://localhost:5173")
console.log("NODE_ENV:", process.env.NODE_ENV || "development")

const app: Express = express()

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
)

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true, limit: "50mb" }))

// Add request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

// File upload middleware
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    console.log("File filter - Field:", file.fieldname, "Type:", file.mimetype)
    if (file.fieldname === "images") {
      if (file.mimetype.startsWith("image/")) {
        cb(null, true)
      } else {
        cb(new Error("Only image files are allowed for images"))
      }
    } else if (file.fieldname === "video") {
      if (file.mimetype.startsWith("video/")) {
        cb(null, true)
      } else {
        cb(new Error("Only video files are allowed for video"))
      }
    } else {
      cb(null, true)
    }
  },
})

// Connect to MongoDB
const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not set")
    }

    console.log("Connecting to MongoDB...")
    await mongoose.connect(process.env.MONGO_URI)
    console.log("✅ Connected to MongoDB successfully")
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown MongoDB error"
    console.error("❌ MongoDB connection error:", errorMessage)
    process.exit(1)
  }
}

connectDB().catch((error: unknown) => {
  const errorMessage = error instanceof Error ? error.message : "Unknown error"
  console.error("Failed to connect to database:", errorMessage)
})

// Import routes
import productRoutes from "../routes/product.routes"

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  })
})

// Use routes
app.use("/api/products", productRoutes)

// Error handling middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("=== SERVER ERROR ===")
  console.error("Error:", error)
  console.error("Stack:", error.stack)
  console.error("Request URL:", req.url)
  console.error("Request Method:", req.method)
  console.error("Request Body:", req.body)
  console.error("Request Files:", req.files)
  console.error("===================")

  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
  })
})

// 404 handler
app.use("*", (req: Request, res: Response) => {
  console.log("404 - Route not found:", req.method, req.originalUrl)
  res.status(404).json({ message: "Route not found" })
})

const PORT: number = Number(process.env.PORT) || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📍 Health check: http://localhost:${PORT}/health`)
  console.log(`🛍️ Products API: http://localhost:${PORT}/api/products`)
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`)
  console.log("======================")
})
