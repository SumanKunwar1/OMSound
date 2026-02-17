import mongoose, { type Document } from "mongoose"

export interface IProduct extends Document {
  id: string
  name: string
  price: number
  coverage: string
  type: string
  application: string
  waterproofingRating: string
  durationYears: number
  images: string[]
  video?: string
  audio?: string
  description: string
  details: string[]
  applicationInstructions?: string[]
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
      index: true,
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    coverage: { type: String, required: true },
    type: { type: String, required: true },
    application: { type: String, required: true },
    waterproofingRating: { type: String, required: true },
    durationYears: { type: Number, required: true },
    images: { type: [String], required: true },
    video: { type: String },
    audio: { type: String },
    description: { type: String, required: true },
    details: { type: [String], required: true },
    applicationInstructions: { type: [String] },
    inStock: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    brand: { type: String, default: "Trinity Waterproofing" },
    category: { type: String, required: true },
    seoTitle: { type: String },
    seoDescription: { type: String },
    seoKeywords: { type: String },
  },
  { timestamps: true },
)

productSchema.statics.findByCustomId = function (customId: string) {
  return this.findOne({ id: customId })
}

export const Product = mongoose.model<IProduct>("Product", productSchema)