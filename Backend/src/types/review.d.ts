// types/review.d.ts
export interface Review {
  id: string
  productId: string
  userId: string
  orderId: string
  reviewerName: string
  productName: string
  productImage: string
  rating: number
  comment: string
  date: string // ISO string
  verified: boolean
}

export interface ReviewStats {
  averageRating: number
  totalReviews: number
  ratingBreakdown: {
    "1": number
    "2": number
    "3": number
    "4": number
    "5": number
  }
}

export interface CreateReviewData {
  productId: string
  orderId: string
  rating: number
  comment: string
  productName: string
  productImage: string
  userId: string // Will be passed from frontend for demo purposes as per existing controller
}

export interface UpdateReviewData {
  rating?: number
  comment?: string
  userId: string // Will be passed from frontend for demo purposes as per existing controller
}
