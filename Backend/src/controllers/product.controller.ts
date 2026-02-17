import type { Request, Response } from "express"
import { Product } from "../models/product.model"
import { uploadToCloudinary, uploadImages } from "../utils/cloudinary"
import type { Express } from "express"

interface ProductRequestBody {
  id: string
  name: string
  price: string | number
  coverage: string
  type: string
  application: string
  waterproofingRating: string
  durationYears: string | number
  brand: string
  category: string
  description: string
  details: string | string[]
  applicationInstructions: string | string[]
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
    let product = await Product.findById(req.params.id).catch(() => null)

    if (!product) {
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
    console.log("Request body:", req.body)
    console.log("Files:", {
      images: (req.files as any)?.images?.length || 0,
      video: (req.files as any)?.video?.length || 0,
    })

    const productData = req.body

    // Validate request body
    if (!productData || Object.keys(productData).length === 0) {
      console.error("Empty request body received")
      res.status(400).json({
        message: "Request body is empty. Make sure you're sending form data correctly.",
      })
      return
    }

    // Validate required fields
    const requiredFields: (keyof ProductRequestBody)[] = [
      "id",
      "name",
      "price",
      "coverage",
      "type",
      "application",
      "waterproofingRating",
      "durationYears",
      "category",
      "description",
    ]

    const missingFields: string[] = []

    for (const field of requiredFields) {
      if (!productData[field]) {
        missingFields.push(field)
      }
    }

    if (missingFields.length > 0) {
      console.error("Missing required fields:", missingFields)
      res.status(400).json({
        message: "Validation failed",
        missingFields,
        receivedFields: Object.keys(productData),
      })
      return
    }

    // Properly type the files
    const files = req.files as {
      images?: Express.Multer.File[]
      video?: Express.Multer.File[]
    } | undefined

    // Validate images
    if (!files || !files.images || files.images.length === 0) {
      console.error("No images provided in request")
      res.status(400).json({
        message: "At least one image is required",
        details: "Please upload at least one product image",
      })
      return
    }

    let imageUrls: string[] = []
    let videoUrl = ""

    try {
      // Upload images
      if (files.images && files.images.length > 0) {
        try {
          console.log("Uploading", files.images.length, "image(s) to Cloudinary...")
          imageUrls = await uploadImages(files.images, "products")
          console.log("Images uploaded successfully:", imageUrls.length, "images")
        } catch (uploadError: unknown) {
          console.error("Image upload to Cloudinary failed:", uploadError)
          const errorMessage =
            uploadError instanceof Error
              ? uploadError.message
              : "Failed to process images. Please ensure files are valid images (JPG, PNG, etc.)"
          res.status(400).json({
            message: "Failed to upload images",
            error: errorMessage,
            hint: "Make sure files are valid images (JPG, PNG, GIF, WebP)",
          })
          return
        }
      }

      // Upload video if provided
      if (files.video && files.video.length > 0) {
        try {
          console.log("Uploading video to Cloudinary...")
          videoUrl = await uploadToCloudinary(files.video[0].buffer, "products/videos")
          console.log("Video uploaded successfully")
        } catch (uploadError: unknown) {
          console.error("Video upload error:", uploadError)
          const errorMessage = uploadError instanceof Error ? uploadError.message : "Video upload failed"
          res.status(400).json({
            message: "Failed to upload video",
            error: errorMessage,
          })
          return
        }
      }
    } catch (uploadError: unknown) {
      console.error("Unexpected upload error:", uploadError)
      res.status(500).json({
        message: "Unexpected error during file upload",
        error: uploadError instanceof Error ? uploadError.message : "Unknown error",
      })
      return
    }

    // Process arrays
    const details = Array.isArray(productData.details)
      ? productData.details.filter((detail: string) => detail && detail.trim() !== "")
      : typeof productData.details === "string" && productData.details.trim() !== ""
        ? [productData.details.trim()]
        : []

    const applicationInstructions = Array.isArray(productData.applicationInstructions)
      ? productData.applicationInstructions.filter(
          (instruction: string) => instruction && instruction.trim() !== "",
        )
      : typeof productData.applicationInstructions === "string" && productData.applicationInstructions.trim() !== ""
        ? [productData.applicationInstructions.trim()]
        : []

    // Validate numeric fields
    const price = typeof productData.price === "string" ? Number.parseFloat(productData.price) : productData.price
    const durationYears =
      typeof productData.durationYears === "string" ? Number.parseInt(productData.durationYears) : productData.durationYears

    if (isNaN(price) || price <= 0) {
      res.status(400).json({ message: "Price must be a valid positive number" })
      return
    }

    if (isNaN(durationYears) || durationYears <= 0) {
      res.status(400).json({ message: "Duration must be a valid positive number" })
      return
    }

    // Create product
    const newProductData = {
      id: productData.id.trim(),
      name: productData.name.trim(),
      price,
      coverage: productData.coverage.trim(),
      type: productData.type.trim(),
      application: productData.application.trim(),
      waterproofingRating: productData.waterproofingRating.trim(),
      durationYears,
      brand: (productData.brand || "Trinity Waterproofing").trim(),
      category: productData.category.trim(),
      images: imageUrls,
      video: videoUrl || (productData.video ? productData.video.trim() : ""),
      audio: productData.audio ? productData.audio.trim() : "",
      description: productData.description.trim(),
      details,
      applicationInstructions,
      inStock: productData.inStock === "true" || productData.inStock === true,
      rating:
        typeof productData.rating === "string" ? Number.parseFloat(productData.rating) || 0 : productData.rating || 0,
      reviewCount:
        typeof productData.reviewCount === "string" ? Number.parseInt(productData.reviewCount) || 0 : productData.reviewCount || 0,
      seoTitle: productData.seoTitle ? productData.seoTitle.trim() : "",
      seoDescription: productData.seoDescription ? productData.seoDescription.trim() : "",
      seoKeywords: productData.seoKeywords ? productData.seoKeywords.trim() : "",
    }

    console.log("Creating product with:", { ...newProductData, images: `${imageUrls.length} images` })

    const product = new Product(newProductData)
    await product.save()

    console.log("Product created successfully:", product._id)
    console.log("=== CREATE PRODUCT END ===")
    res.status(201).json(product)
  } catch (error: unknown) {
    console.error("Error creating product:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    res.status(400).json({
      message: "Error creating product",
      error: errorMessage,
    })
  }
}

export const updateProduct = async (
  req: Request<{ id: string }, {}, ProductRequestBody>,
  res: Response,
): Promise<void> => {
  try {
    const productData = req.body
    const files = req.files as {
      images?: Express.Multer.File[]
      video?: Express.Multer.File[]
    } | undefined

    console.log("Updating product:", req.params.id)

    // Find existing product
    let existingProduct = await Product.findById(req.params.id).catch(() => null)

    if (!existingProduct) {
      existingProduct = await Product.findOne({ id: req.params.id })
    }

    if (!existingProduct) {
      res.status(404).json({ message: "Product not found" })
      return
    }

    // Handle file uploads
    let imageUrls: string[] = []
    let videoUrl = ""

    // Handle existing images
    if (productData.existingImages) {
      const existingImages = Array.isArray(productData.existingImages)
        ? productData.existingImages
        : [productData.existingImages]
      imageUrls = existingImages.filter((img: string) => img && img.trim() !== "")
    }

    // Handle new images
    if (files) {
      if (files.images && files.images.length > 0) {
        try {
          console.log("Uploading new images:", files.images.length)
          const newImageUrls = await uploadImages(files.images, "products")
          imageUrls = [...imageUrls, ...newImageUrls]
          console.log("New images uploaded:", newImageUrls)
        } catch (uploadError: unknown) {
          const errorMessage = uploadError instanceof Error ? uploadError.message : "Image upload failed"
          res.status(400).json({ message: "Failed to upload images", error: errorMessage })
          return
        }
      }

      if (files.video && files.video.length > 0) {
        try {
          console.log("Uploading new video:", files.video[0].originalname)
          videoUrl = await uploadToCloudinary(files.video[0].buffer, "products/videos")
          console.log("Video uploaded successfully")
        } catch (uploadError: unknown) {
          const errorMessage = uploadError instanceof Error ? uploadError.message : "Video upload failed"
          res.status(400).json({ message: "Failed to upload video", error: errorMessage })
          return
        }
      }
    }

    // Process arrays
    const details = Array.isArray(productData.details)
      ? productData.details.filter((detail: string) => detail.trim() !== "")
      : typeof productData.details === "string"
        ? [productData.details].filter((detail) => detail.trim() !== "")
        : []

    const applicationInstructions = Array.isArray(productData.applicationInstructions)
      ? productData.applicationInstructions.filter((instruction: string) => instruction.trim() !== "")
      : typeof productData.applicationInstructions === "string"
        ? [productData.applicationInstructions].filter((instruction) => instruction.trim() !== "")
        : []

    // Update product data
    const updateData = {
      id: productData.id || existingProduct.id,
      name: productData.name || existingProduct.name,
      price:
        typeof productData.price === "string"
          ? Number.parseFloat(productData.price)
          : productData.price || existingProduct.price,
      coverage: productData.coverage || existingProduct.coverage,
      type: productData.type || existingProduct.type,
      application: productData.application || existingProduct.application,
      waterproofingRating: productData.waterproofingRating || existingProduct.waterproofingRating,
      durationYears:
        typeof productData.durationYears === "string"
          ? Number.parseInt(productData.durationYears)
          : productData.durationYears || existingProduct.durationYears,
      brand: productData.brand || existingProduct.brand,
      category: productData.category || existingProduct.category,
      images: imageUrls.length > 0 ? imageUrls : existingProduct.images,
      video: videoUrl || productData.video || existingProduct.video,
      audio: productData.audio !== undefined ? productData.audio : existingProduct.audio,
      description: productData.description || existingProduct.description,
      details: details.length > 0 ? details : existingProduct.details,
      applicationInstructions:
        applicationInstructions.length > 0 ? applicationInstructions : existingProduct.applicationInstructions,
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
    let product = await Product.findByIdAndDelete(req.params.id).catch(() => null)

    if (!product) {
      product = await Product.findOneAndDelete({ id: req.params.id })
    }

    if (!product) {
      res.status(404).json({ message: "Product not found" })
      return
    }

    res.json({ message: "Product deleted successfully" })
  } catch (error: unknown) {
    console.error("Error deleting product:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    res.status(500).json({ message: "Error deleting product", error: errorMessage })
  }
}