// controllers/review.controller.ts
import type { Request, Response } from "express"
import { v4 as uuidv4 } from "uuid"
import type { Review, ReviewStats, CreateReviewData, UpdateReviewData } from "../types/review"
import { asyncHandler } from "../utils/asyncHandler.utils"

// --- Mock Database (In a real app, this would be a database like MongoDB, PostgreSQL, etc.) ---
const reviews: Review[] = []

// Helper to calculate review stats
const calculateReviewStats = (productId: string): ReviewStats => {
  const productReviews = reviews.filter((r) => r.productId === productId)
  const totalReviews = productReviews.length
  let sumRatings = 0
  // FIX: Changed "4": "0" to "4": 0 to match the number type in ReviewStats
  const ratingBreakdown: ReviewStats["ratingBreakdown"] = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }

  productReviews.forEach((review) => {
    sumRatings += review.rating
    ratingBreakdown[review.rating.toString() as keyof ReviewStats["ratingBreakdown"]]++
  })

  const averageRating = totalReviews > 0 ? sumRatings / totalReviews : 0

  return {
    averageRating: Number.parseFloat(averageRating.toFixed(1)),
    totalReviews,
    ratingBreakdown,
  }
}

// --- Controller Functions ---

/**
 * Creates a new product review.
 * POST /api/reviews
 */
export const createReview = asyncHandler(async (req: Request, res: Response) => {
  const { productId, orderId, rating, comment, productName, productImage, userId } = req.body as CreateReviewData

  if (!productId || !orderId || !rating || !comment || !productName || !userId) {
    return res.status(400).json({ message: "Missing required review fields." })
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5." })
  }

  // Check if a review already exists for this product and order by this user
  const existingReviewIndex = reviews.findIndex(
    (r) => r.productId === productId && r.orderId === orderId && r.userId === userId,
  )

  if (existingReviewIndex !== -1) {
    // If exists, update it
    reviews[existingReviewIndex] = {
      ...reviews[existingReviewIndex],
      rating,
      comment,
      date: new Date().toISOString(),
      verified: true, // Assuming reviews from delivered orders are verified
    }
    return res.status(200).json(reviews[existingReviewIndex])
  } else {
    // Otherwise, create new
    const newReview: Review = {
      id: uuidv4(),
      productId,
      userId,
      orderId,
      reviewerName: "User " + userId.substring(0, 4), // Mock reviewer name
      productName,
      productImage: productImage || "/placeholder.svg",
      rating,
      comment,
      date: new Date().toISOString(),
      verified: true, // Assuming reviews from delivered orders are verified
    }
    reviews.push(newReview)
    return res.status(201).json(newReview)
  }
})

/**
 * Fetches all reviews for a specific product.
 * GET /api/reviews/product/:productId
 */
export const getReviewsByProductId = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params
  const productReviews = reviews.filter((review) => review.productId === productId)
  return res.status(200).json(productReviews)
})

/**
 * Fetches all reviews written by a specific user.
 * GET /api/reviews/user/:userId
 */
export const getReviewsByUserId = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params
  const userReviews = reviews.filter((review) => review.userId === userId)
  return res.status(200).json(userReviews)
})

/**
 * Fetches a single review by its ID.
 * GET /api/reviews/:id
 */
export const getReviewById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const review = reviews.find((r) => r.id === id)
  if (!review) {
    return res.status(404).json({ message: "Review not found" })
  }
  return res.status(200).json(review)
})

/**
 * Updates an existing review.
 * PUT /api/reviews/:id
 */
export const updateReview = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const { rating, comment, userId } = req.body as UpdateReviewData

  const reviewIndex = reviews.findIndex((r) => r.id === id)
  if (reviewIndex === -1) {
    return res.status(404).json({ message: "Review not found" })
  }

  // Basic authorization check (in a real app, this would be more robust)
  if (reviews[reviewIndex].userId !== userId) {
    return res.status(403).json({ message: "Unauthorized to update this review" })
  }

  if (rating !== undefined) {
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5." })
    }
    reviews[reviewIndex].rating = rating
  }
  if (comment !== undefined) {
    reviews[reviewIndex].comment = comment
  }
  reviews[reviewIndex].date = new Date().toISOString() // Update date on modification

  return res.status(200).json(reviews[reviewIndex])
})

/**
 * Deletes a review.
 * DELETE /api/reviews/:id
 */
export const deleteReview = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const { userId } = req.body // Expect userId in body for authorization

  const reviewIndex = reviews.findIndex((r) => r.id === id)
  if (reviewIndex === -1) {
    return res.status(404).json({ message: "Review not found" })
  }

  // Basic authorization check
  if (reviews[reviewIndex].userId !== userId) {
    return res.status(403).json({ message: "Unauthorized to delete this review" })
  }

  reviews.splice(reviewIndex, 1)
  return res.status(204).send() // No content on successful deletion
})

/**
 * Fetches review statistics for a product.
 * GET /api/reviews/stats/:productId
 */
export const getReviewStatsForProduct = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params
  const stats = calculateReviewStats(productId)
  return res.status(200).json(stats)
})
