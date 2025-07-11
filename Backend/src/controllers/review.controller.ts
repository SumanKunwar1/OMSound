import type { Request, Response, NextFunction } from "express"
import mongoose from "mongoose"
import Review, { type IReview } from "../models/review.model"
import { ErrorResponse } from "../utils/errorResponse"
import User from "../models/users.model" // Assuming User model is available

// Helper to transform review for frontend
const transformReview = (review: IReview) => ({
  id: review._id.toString(),
  productId: review.productId,
  userId: review.userId.toString(),
  orderId: review.orderId.toString(),
  reviewerName: review.reviewerName,
  productName: review.productName,
  productImage: review.productImage,
  rating: review.rating,
  comment: review.comment,
  date: review.createdAt.toISOString(), // Use createdAt as the review date
  verified: review.verified,
})

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Public (for demo, normally Private/Protected)
export const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // For demo, we'll use a hardcoded user ID if not provided by auth middleware
    // In a real app, req.user would be populated by authentication middleware
    const DEMO_USER_ID = new mongoose.Types.ObjectId("507f1f77bcf86cd799439011")
    const userId = req.body.userId || DEMO_USER_ID // Use provided userId or demo ID
    const { productId, orderId, rating, comment, productName, productImage } = req.body

    if (!productId || !orderId || !rating || !comment || !productName || !productImage) {
      return next(
        new ErrorResponse("Please provide product ID, order ID, rating, comment, product name, and image", 400),
      )
    }

    // Fetch user details to get reviewerName
    const user = await User.findById(userId)
    if (!user) {
      return next(new ErrorResponse("User not found", 404))
    }
    const reviewerName = `${user.firstName} ${user.lastName}`

    // Check if a review already exists for this user, product, and order
    const existingReview = await Review.findOne({ userId, productId, orderId })
    if (existingReview) {
      return next(new ErrorResponse("You have already reviewed this product for this order.", 400))
    }

    const review = new Review({
      productId,
      userId,
      orderId,
      reviewerName,
      productName,
      productImage,
      rating,
      comment,
      verified: true, // For demo, assume verified if placed through dashboard
    })

    const createdReview = await review.save()
    res.status(201).json(transformReview(createdReview))
  } catch (error) {
    console.error("Create review error:", error)
    next(error)
  }
}

// @desc    Get all reviews for a specific product
// @route   GET /api/reviews/product/:productId
// @access  Public
export const getReviewsByProductId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 })
    res.json(reviews.map(transformReview))
  } catch (error) {
    next(error)
  }
}

// @desc    Get all reviews by a specific user
// @route   GET /api/reviews/user/:userId
// @access  Public (for demo, normally Private/Protected)
export const getReviewsByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // In a real app, you'd verify req.user.id === req.params.userId or admin role
    const { userId } = req.params
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(new ErrorResponse("Invalid User ID", 400))
    }
    const reviews = await Review.find({ userId: new mongoose.Types.ObjectId(userId) }).sort({ createdAt: -1 })
    res.json(reviews.map(transformReview))
  } catch (error) {
    next(error)
  }
}

// @desc    Get a single review by ID
// @route   GET /api/reviews/:id
// @access  Public
export const getReviewById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const review = await Review.findById(req.params.id)
    if (!review) {
      return next(new ErrorResponse("Review not found", 404))
    }
    res.json(transformReview(review))
  } catch (error) {
    next(error)
  }
}

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Public (for demo, normally Private/Protected - user must own review)
export const updateReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // For demo, we'll use a hardcoded user ID if not provided by auth middleware
    const DEMO_USER_ID = new mongoose.Types.ObjectId("507f1f77bcf86cd799439011")
    const userId = req.body.userId || DEMO_USER_ID // Use provided userId or demo ID

    const { rating, comment } = req.body

    const review = await Review.findById(req.params.id)

    if (!review) {
      return next(new ErrorResponse("Review not found", 404))
    }

    // In a real app, ensure req.user.id matches review.userId
    if (review.userId.toString() !== userId.toString()) {
      return next(new ErrorResponse("Not authorized to update this review", 403))
    }

    review.rating = rating || review.rating
    review.comment = comment || review.comment

    const updatedReview = await review.save()
    res.json(transformReview(updatedReview))
  } catch (error) {
    console.error("Update review error:", error)
    next(error)
  }
}

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Public (for demo, normally Private/Protected - user must own review)
export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // For demo, we'll use a hardcoded user ID if not provided by auth middleware
    const DEMO_USER_ID = new mongoose.Types.ObjectId("507f1f77bcf86cd799439011")
    const userId = req.body.userId || DEMO_USER_ID // Use provided userId or demo ID

    const review = await Review.findById(req.params.id)

    if (!review) {
      return next(new ErrorResponse("Review not found", 404))
    }

    // In a real app, ensure req.user.id matches review.userId
    if (review.userId.toString() !== userId.toString()) {
      return next(new ErrorResponse("Not authorized to delete this review", 403))
    }

    await review.deleteOne()
    res.status(200).json({ message: "Review removed" })
  } catch (error) {
    next(error)
  }
}

// @desc    Get review statistics for a product
// @route   GET /api/reviews/stats/:productId
// @access  Public
export const getReviewStatsForProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params

    const stats = await Review.aggregate([
      { $match: { productId } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
          ratingBreakdown: {
            $push: {
              rating: "$rating",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          averageRating: { $round: ["$averageRating", 1] }, // Round to 1 decimal place
          totalReviews: 1,
          ratingBreakdown: {
            $arrayToObject: {
              $map: {
                input: [5, 4, 3, 2, 1],
                as: "r",
                in: {
                  k: { $toString: "$$r" },
                  v: {
                    $size: {
                      $filter: {
                        input: "$ratingBreakdown",
                        as: "item",
                        cond: { $eq: ["$$item.rating", "$$r"] },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    ])

    if (stats.length === 0) {
      return res.json({
        averageRating: 0,
        totalReviews: 0,
        ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      })
    }

    res.json(stats[0])
  } catch (error) {
    console.error("Get review stats error:", error)
    next(error)
  }
}
