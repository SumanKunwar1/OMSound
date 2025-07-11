import mongoose, { type Document, Schema } from "mongoose"

export interface IReview extends Document {
  _id: mongoose.Types.ObjectId
  productId: string
  userId: mongoose.Types.ObjectId
  orderId: mongoose.Types.ObjectId
  reviewerName: string // Storing for display convenience
  productName: string // Storing for display convenience
  productImage: string // Storing for display convenience
  rating: number
  comment: string
  verified: boolean
  createdAt: Date
  updatedAt: Date
}

const reviewSchema = new Schema<IReview>(
  {
    productId: {
      type: String, // Assuming product IDs are strings for now
      required: [true, "Product ID is required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: [true, "Order ID is required"],
    },
    reviewerName: {
      type: String,
      required: [true, "Reviewer name is required"],
    },
    productName: {
      type: String,
      required: [true, "Product name is required"],
    },
    productImage: {
      type: String,
      required: [true, "Product image is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot be more than 5"],
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
      maxlength: [500, "Comment cannot exceed 500 characters"],
    },
    verified: {
      type: Boolean,
      default: false, // Can be set to true if the user is verified purchaser
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  },
)

// Add indexes for efficient querying
reviewSchema.index({ productId: 1 })
reviewSchema.index({ userId: 1 })
reviewSchema.index({ orderId: 1 })
reviewSchema.index({ productId: 1, userId: 1, orderId: 1 }, { unique: true }) // Ensure one review per product per order per user

const Review = mongoose.model<IReview>("Review", reviewSchema)
export default Review
