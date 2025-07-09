import type { Request, Response } from "express"
import { Product } from "../models/product.model"
import { uploadToCloudinary, uploadImages } from "../utils/cloudinary"
import type { Express } from "express"

interface UploadedFiles {
  images?: Express.Multer.File[]
  video?: Express.Multer.File[]
}

interface ProductRequestBody {
  id: string
  name: string
  price: string | number
  size: string
  tone: string
  type: string
  musicalNote: string
  brand: string
  category: string
  description: string
  details: string | string[]
  careInstructions: string | string[]
  inStock: string | boolean
  rating: string | number
  reviewCount: string | number
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  video?: string
  audio?: string
  existingImages?: string | string[]
}

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find().sort({ createdAt: -1 })
    res.json(products)
  } catch (error: unknown) {
    console.error("Error fetching products:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    res.status(500).json({ message: "Error fetching products", error: errorMessage })
  }
}

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    // Try to find by MongoDB _id first, then by custom id
    let product = await Product.findById(req.params.id).catch(() => null)

    if (!product) {
      // If not found by _id, try to find by custom id
      product = await Product.findOne({ id: req.params.id })
    }

    if (!product) {
      res.status(404).json({ message: "Product not found" })
      return
    }
    res.json(product)
  } catch (error: unknown) {
    console.error("Error fetching product:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    res.status(500).json({ message: "Error fetching product", error: errorMessage })
  }
}

export const getProductsForShop = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find({ inStock: true }).sort({ createdAt: -1 })
    res.json(products)
  } catch (error: unknown) {
    console.error("Error fetching products for shop:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    res.status(500).json({ message: "Error fetching products", error: errorMessage })
  }
}

export const createProduct = async (req: Request<{}, {}, ProductRequestBody>, res: Response): Promise<void> => {
  try {
    console.log("=== CREATE PRODUCT START ===")
    console.log("Request method:", req.method)
    console.log("Request URL:", req.url)
    console.log("Request headers:", req.headers)
    console.log("Request body:", req.body)
    console.log("Request files:", req.files)
    console.log("Content-Type:", req.get("Content-Type"))

    const productData = req.body
    const files = req.files as UploadedFiles

    // Check if body is empty
    if (!productData || Object.keys(productData).length === 0) {
      console.error("Empty request body received")
      res.status(400).json({
        message: "Request body is empty. Make sure you're sending form data correctly.",
        received: productData,
      })
      return
    }

    // Validate required fields with detailed error messages
    const requiredFields: (keyof ProductRequestBody)[] = [
      "id",
      "name",
      "price",
      "size",
      "tone",
      "type",
      "musicalNote",
      "category",
      "description",
    ]

    const missingFields: string[] = []
    const emptyFields: string[] = []

    for (const field of requiredFields) {
      if (!productData[field]) {
        missingFields.push(field)
      } else if (productData[field] === "") {
        emptyFields.push(field)
      }
    }

    if (missingFields.length > 0 || emptyFields.length > 0) {
      console.error("Validation failed:")
      console.error("Missing fields:", missingFields)
      console.error("Empty fields:", emptyFields)
      console.error("Received data:", productData)

      res.status(400).json({
        message: "Validation failed",
        missingFields,
        emptyFields,
        receivedFields: Object.keys(productData),
        help: "Make sure all required fields are filled out",
      })
      return
    }

    // Handle file uploads to Cloudinary
    let imageUrls: string[] = []
    let videoUrl = ""

    if (files) {
      // Handle image uploads
      if (files.images && files.images.length > 0) {
        try {
          console.log("Uploading images:", files.images.length)
          imageUrls = await uploadImages(files.images, "products")
          console.log("Images uploaded successfully:", imageUrls)
        } catch (uploadError: unknown) {
          console.error("Image upload error:", uploadError)
          const errorMessage = uploadError instanceof Error ? uploadError.message : "Image upload failed"
          res.status(400).json({ message: "Failed to upload images", error: errorMessage })
          return
        }
      }

      // Handle video upload
      if (files.video && files.video.length > 0) {
        try {
          console.log("Uploading video:", files.video[0].originalname)
          videoUrl = await uploadToCloudinary(files.video[0].buffer, "products/videos")
          console.log("Video uploaded successfully:", videoUrl)
        } catch (uploadError: unknown) {
          console.error("Video upload error:", uploadError)
          const errorMessage = uploadError instanceof Error ? uploadError.message : "Video upload failed"
          res.status(400).json({ message: "Failed to upload video", error: errorMessage })
          return
        }
      }
    }

    // Ensure at least one image is provided
    if (imageUrls.length === 0) {
      console.error("No images provided")
      res.status(400).json({ message: "At least one image is required" })
      return
    }

    // Process arrays from form data with better validation
    const details = Array.isArray(productData.details)
      ? productData.details.filter((detail: string) => detail && detail.trim() !== "")
      : typeof productData.details === "string" && productData.details.trim() !== ""
        ? [productData.details.trim()]
        : []

    const careInstructions = Array.isArray(productData.careInstructions)
      ? productData.careInstructions.filter((instruction: string) => instruction && instruction.trim() !== "")
      : typeof productData.careInstructions === "string" && productData.careInstructions.trim() !== ""
        ? [productData.careInstructions.trim()]
        : []

    // Validate price
    const price = typeof productData.price === "string" ? Number.parseFloat(productData.price) : productData.price
    if (isNaN(price) || price <= 0) {
      console.error("Invalid price:", productData.price)
      res.status(400).json({ message: "Price must be a valid positive number" })
      return
    }

    // Create product object with custom ID
    const newProductData = {
      id: productData.id.trim(),
      name: productData.name.trim(),
      price,
      size: productData.size.trim(),
      tone: productData.tone.trim(),
      type: productData.type.trim(),
      musicalNote: productData.musicalNote.trim(),
      brand: (productData.brand || "OMSound Nepal").trim(),
      category: productData.category.trim(),
      images: imageUrls,
      video: videoUrl || (productData.video ? productData.video.trim() : ""),
      audio: productData.audio ? productData.audio.trim() : "",
      description: productData.description.trim(),
      details,
      careInstructions,
      inStock: productData.inStock === "true" || productData.inStock === true,
      rating:
        typeof productData.rating === "string" ? Number.parseFloat(productData.rating) || 0 : productData.rating || 0,
      reviewCount:
        typeof productData.reviewCount === "string"
          ? Number.parseInt(productData.reviewCount) || 0
          : productData.reviewCount || 0,
      seoTitle: productData.seoTitle ? productData.seoTitle.trim() : "",
      seoDescription: productData.seoDescription ? productData.seoDescription.trim() : "",
      seoKeywords: productData.seoKeywords ? productData.seoKeywords.trim() : "",
    }

    console.log("Creating product with processed data:", newProductData)

    const product = new Product(newProductData)
    await product.save()

    console.log("Product created successfully:", product)
    console.log("=== CREATE PRODUCT END ===")
    res.status(201).json(product)
  } catch (error: unknown) {
    console.error("Error creating product:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    res.status(400).json({ message: "Error creating product", error: errorMessage })
  }
}

export const updateProduct = async (
  req: Request<{ id: string }, {}, ProductRequestBody>,
  res: Response,
): Promise<void> => {
  try {
    const productData = req.body
    const files = req.files as UploadedFiles

    console.log("Updating product with ID:", req.params.id)
    console.log("Update data:", productData)
    console.log("Files received:", files)

    // Find existing product by MongoDB _id or custom id
    let existingProduct = await Product.findById(req.params.id).catch(() => null)

    if (!existingProduct) {
      existingProduct = await Product.findOne({ id: req.params.id })
    }

    if (!existingProduct) {
      res.status(404).json({ message: "Product not found" })
      return
    }

    // Handle file uploads to Cloudinary
    let imageUrls: string[] = []
    let videoUrl = ""

    // Handle existing images
    if (productData.existingImages) {
      const existingImages = Array.isArray(productData.existingImages)
        ? productData.existingImages
        : [productData.existingImages]
      imageUrls = existingImages.filter((img: string) => img && img.trim() !== "")
      console.log("Existing images:", imageUrls)
    }

    if (files) {
      // Handle new image uploads
      if (files.images && files.images.length > 0) {
        try {
          console.log("Uploading new images:", files.images.length)
          const newImageUrls = await uploadImages(files.images, "products")
          imageUrls = [...imageUrls, ...newImageUrls]
          console.log("New images uploaded:", newImageUrls)
        } catch (uploadError: unknown) {
          console.error("Image upload error:", uploadError)
          const errorMessage = uploadError instanceof Error ? uploadError.message : "Image upload failed"
          res.status(400).json({ message: "Failed to upload images", error: errorMessage })
          return
        }
      }

      // Handle video upload
      if (files.video && files.video.length > 0) {
        try {
          console.log("Uploading new video:", files.video[0].originalname)
          videoUrl = await uploadToCloudinary(files.video[0].buffer, "products/videos")
          console.log("Video uploaded successfully:", videoUrl)
        } catch (uploadError: unknown) {
          console.error("Video upload error:", uploadError)
          const errorMessage = uploadError instanceof Error ? uploadError.message : "Video upload failed"
          res.status(400).json({ message: "Failed to upload video", error: errorMessage })
          return
        }
      }
    }

    // Process arrays from form data
    const details = Array.isArray(productData.details)
      ? productData.details.filter((detail: string) => detail.trim() !== "")
      : typeof productData.details === "string"
        ? [productData.details].filter((detail) => detail.trim() !== "")
        : []

    const careInstructions = Array.isArray(productData.careInstructions)
      ? productData.careInstructions.filter((instruction: string) => instruction.trim() !== "")
      : typeof productData.careInstructions === "string"
        ? [productData.careInstructions].filter((instruction) => instruction.trim() !== "")
        : []

    // Update product data
    const updateData = {
      id: productData.id || existingProduct.id, // Keep the custom ID
      name: productData.name || existingProduct.name,
      price: productData.price
        ? typeof productData.price === "string"
          ? Number.parseFloat(productData.price)
          : productData.price
        : existingProduct.price,
      size: productData.size || existingProduct.size,
      tone: productData.tone || existingProduct.tone,
      type: productData.type || existingProduct.type,
      musicalNote: productData.musicalNote || existingProduct.musicalNote,
      brand: productData.brand || existingProduct.brand,
      category: productData.category || existingProduct.category,
      images: imageUrls.length > 0 ? imageUrls : existingProduct.images,
      video: videoUrl || productData.video || existingProduct.video, // Prioritize uploaded video
      audio: productData.audio !== undefined ? productData.audio : existingProduct.audio,
      description: productData.description || existingProduct.description,
      details: details.length > 0 ? details : existingProduct.details,
      careInstructions: careInstructions.length > 0 ? careInstructions : existingProduct.careInstructions,
      inStock:
        productData.inStock !== undefined
          ? productData.inStock === "true" || productData.inStock === true
          : existingProduct.inStock,
      rating: productData.rating
        ? typeof productData.rating === "string"
          ? Number.parseFloat(productData.rating)
          : productData.rating
        : existingProduct.rating,
      reviewCount: productData.reviewCount
        ? typeof productData.reviewCount === "string"
          ? Number.parseInt(productData.reviewCount)
          : productData.reviewCount
        : existingProduct.reviewCount,
      seoTitle: productData.seoTitle !== undefined ? productData.seoTitle : existingProduct.seoTitle,
      seoDescription:
        productData.seoDescription !== undefined ? productData.seoDescription : existingProduct.seoDescription,
      seoKeywords: productData.seoKeywords !== undefined ? productData.seoKeywords : existingProduct.seoKeywords,
    }

    console.log("Updating with data:", updateData)

    const product = await Product.findByIdAndUpdate(existingProduct._id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!product) {
      res.status(404).json({ message: "Product not found" })
      return
    }

    console.log("Product updated successfully:", product)
    res.json(product)
  } catch (error: unknown) {
    console.error("Error updating product:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    res.status(400).json({ message: "Error updating product", error: errorMessage })
  }
}

export const deleteProduct = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    // Try to find by MongoDB _id first, then by custom id
    let product = await Product.findByIdAndDelete(req.params.id).catch(() => null)

    if (!product) {
      // If not found by _id, try to find and delete by custom id
      product = await Product.findOneAndDelete({ id: req.params.id })
    }

    if (!product) {
      res.status(404).json({ message: "Product not found" })
      return
    }

    res.json({ message: "Product deleted successfully", deletedProduct: product })
  } catch (error: unknown) {
    console.error("Error deleting product:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    res.status(500).json({ message: "Error deleting product", error: errorMessage })
  }
}
