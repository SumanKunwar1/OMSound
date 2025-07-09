import mongoose, { type Document } from "mongoose"

export interface IProduct extends Document {
  id: string // Custom product ID (different from MongoDB _id)
  name: string
  price: number
  size: string
  tone: string
  type: string
  musicalNote: string
  images: string[]
  video?: string
  audio?: string
  description: string
  details: string[]
  careInstructions?: string[]
  inStock: boolean
  rating: number
  reviewCount: number
  brand: string
  category: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true, // Add index for better performance
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    tone: { type: String, required: true },
    type: { type: String, required: true },
    musicalNote: { type: String, required: true },
    images: { type: [String], required: true },
    video: { type: String },
    audio: { type: String },
    description: { type: String, required: true },
    details: { type: [String], required: true },
    careInstructions: { type: [String] },
    inStock: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    brand: { type: String, default: "OMSound Nepal" },
    category: { type: String, required: true },
    seoTitle: { type: String },
    seoDescription: { type: String },
    seoKeywords: { type: String },
  },
  { timestamps: true },
)

// Add a method to find by custom id
productSchema.statics.findByCustomId = function (customId: string) {
  return this.findOne({ id: customId })
}

export const Product = mongoose.model<IProduct>("Product", productSchema)
