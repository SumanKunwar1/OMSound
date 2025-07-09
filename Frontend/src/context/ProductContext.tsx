"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Product interface
export interface Product {
  _id?: string
  id: string
  name: string
  price: number
  size: string
  tone: string
  type: string
  musicalNote: string
  brand: string
  category: string
  images: string[]
  description: string
  details: string[]
  careInstructions: string[]
  inStock: boolean
  rating: number
  reviewCount: number
  seoKeywords?: string
  seoTitle?: string
  seoDescription?: string
  video?: string
  audio?: string
  createdAt?: string
  updatedAt?: string
}

// API Service
class ProductService {
  private baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"

  private async makeRequest(url: string, options: RequestInit = {}): Promise<any> {
    try {
      console.log("Making request to:", `${this.baseURL}${url}`)
      console.log("Request options:", options)

      const response = await fetch(`${this.baseURL}${url}`, {
        ...options,
        headers: {
          ...options.headers,
        },
      })

      console.log("Response status:", response.status)
      console.log("Response headers:", response.headers)

      if (!response.ok) {
        let errorData
        try {
          errorData = await response.json()
          console.error("Error response data:", errorData)
        } catch (parseError) {
          console.error("Failed to parse error response:", parseError)
          errorData = { message: `HTTP ${response.status}: ${response.statusText}` }
        }

        const errorMessage = errorData.message || errorData.error || `HTTP error! status: ${response.status}`
        console.error("Full error details:", errorData)
        throw new Error(errorMessage)
      }

      return await response.json()
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  async getProducts(): Promise<Product[]> {
    return this.makeRequest("/products")
  }

  async getProductById(id: string): Promise<Product> {
    return this.makeRequest(`/products/${id}`)
  }

  async createProduct(formData: FormData): Promise<Product> {
    return this.makeRequest("/products", {
      method: "POST",
      body: formData,
    })
  }

  async updateProduct(id: string, formData: FormData): Promise<Product> {
    return this.makeRequest(`/products/${id}`, {
      method: "PUT",
      body: formData,
    })
  }

  async deleteProduct(id: string): Promise<void> {
    return this.makeRequest(`/products/${id}`, {
      method: "DELETE",
    })
  }
}

const productService = new ProductService()

// Context interface
interface ProductContextType {
  products: Product[]
  loading: boolean
  error: string | null
  fetchProducts: () => Promise<void>
  createProduct: (formData: FormData) => Promise<Product>
  updateProduct: (id: string, formData: FormData) => Promise<Product>
  deleteProduct: (id: string) => Promise<void>
  clearError: () => void
}

// Create context
const ProductContext = createContext<ProductContextType | undefined>(undefined)

// Custom hook
export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider")
  }
  return context
}

// Provider props
interface ProductProviderProps {
  children: ReactNode
}

// Provider component
export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clearError = () => setError(null)

  const fetchProducts = async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const data = await productService.getProducts()
      setProducts(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch products"
      setError(errorMessage)
      console.error("Error fetching products:", err)
    } finally {
      setLoading(false)
    }
  }

  const createProduct = async (formData: FormData): Promise<Product> => {
    setLoading(true)
    setError(null)
    try {
      console.log("Creating product with FormData:")
      for (const [key, value] of formData.entries()) {
        console.log(key, value)
      }

      const newProduct = await productService.createProduct(formData)
      setProducts((prev) => [...prev, newProduct])
      return newProduct
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create product"
      console.error("Error creating product:", err)
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const updateProduct = async (id: string, formData: FormData): Promise<Product> => {
    setLoading(true)
    setError(null)
    try {
      const updatedProduct = await productService.updateProduct(id, formData)
      setProducts((prev) => prev.map((p) => (p._id === id || p.id === id ? updatedProduct : p)))
      return updatedProduct
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update product"
      setError(errorMessage)
      console.error("Error updating product:", err)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id: string): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      await productService.deleteProduct(id)
      setProducts((prev) => prev.filter((p) => p._id !== id && p.id !== id))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete product"
      setError(errorMessage)
      console.error("Error deleting product:", err)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const value: ProductContextType = {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    clearError,
  }

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

// Default export
export default ProductProvider
