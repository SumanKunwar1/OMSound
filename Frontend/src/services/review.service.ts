import axios from "axios"

// Infer AxiosRequestConfig type from the second parameter of axios.delete
type AxiosRequestConfig = Parameters<typeof axios.delete>[1]

import { API_URL } from "../config" // Assuming API_URL is defined here

// Define interfaces for review data
interface ReviewData {
  productId: string
  userId: string
  orderId: string
  reviewerName: string
  productName: string
  productImage: string
  rating: number
  comment: string
}

interface UpdateReviewData {
  rating?: number
  comment?: string
  userId: string // Required for authorization on backend
}

export interface Review {
  _id: string // Mongoose ID
  productId: string
  userId: string
  orderId: string
  reviewerName: string
  productName: string
  productImage: string
  rating: number
  comment: string
  verified: boolean
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
}

export const reviewService = {
  async createReview(reviewData: ReviewData): Promise<Review> {
    const response = await axios.post<Review>(`${API_URL}/reviews`, reviewData)
    return response.data
  },

  async updateReview(reviewId: string, updateData: UpdateReviewData): Promise<Review> {
    const response = await axios.put<Review>(`${API_URL}/reviews/${reviewId}`, updateData)
    return response.data
  },

  async deleteReview(reviewId: string, userId: string): Promise<void> {
    // Use the inferred AxiosRequestConfig type
    await axios.delete(`${API_URL}/reviews/${reviewId}`, { data: { userId } } as AxiosRequestConfig)
  },

  async getReviewsByUserId(userId: string): Promise<Review[]> {
    const response = await axios.get<Review[]>(`${API_URL}/reviews/user/${userId}`)
    return response.data
  },

  // Helper function to find an existing review from a list of reviews
  getReviewForProductAndOrder(reviews: Review[], productId: string, orderId: string): Review | undefined {
    return reviews.find((review) => review.productId === productId && review.orderId === orderId)
  },
}
