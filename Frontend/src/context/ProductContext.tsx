import React, { createContext, useContext, useState, useCallback } from "react"
import { productService } from "../services/product.service"

// ✅ FIXED: Waterproofing Product interface (matches product_service.ts)
export interface Product {
  _id?: string
  id: string
  name: string
  price: number
  // Waterproofing specific fields
  coverage: string
  type: string
  application: string
  waterproofingRating: string
  durationYears: number
  // Common fields
  images?: string[]
  description: string
  details?: string[]
  category?: string
  brand?: string
  rating?: number
  reviewCount?: number
  inStock?: boolean
  applicationInstructions?: string[]
  // Optional media
  audio?: string
  video?: string
  // SEO fields
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  // Timestamps
  createdAt?: string
  updatedAt?: string
}

interface ProductContextType {
  products: Product[]
  loading: boolean
  error: string | null
  createProduct: (formData: FormData) => Promise<void>
  updateProduct: (id: string, formData: FormData) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  fetchProducts: () => Promise<void>
  clearError: () => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await productService.getProducts()
      setProducts(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch products"
      console.error("Error fetching products:", errorMessage)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  const createProduct = useCallback(async (formData: FormData) => {
    try {
      setLoading(true)
      setError(null)

      // Validate form data before sending
      const id = formData.get("id")
      const name = formData.get("name")
      const images = formData.getAll("images")

      if (!id || !name) {
        throw new Error("Missing required fields (id, name)")
      }

      if (!images || images.length === 0) {
        throw new Error("At least one image is required")
      }

      console.log("Creating product with:", {
        id,
        name,
        imageCount: images.length,
      })

      const product = await productService.createProduct(formData)
      setProducts((prev) => [product, ...prev])
      setError(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create product"
      console.error("Error creating product:", {
        message: errorMessage,
        stack: err instanceof Error ? err.stack : undefined,
      })
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const updateProduct = useCallback(async (id: string, formData: FormData) => {
    try {
      setLoading(true)
      setError(null)

      console.log("Updating product:", id)

      const product = await productService.updateProduct(id, formData)
      setProducts((prev) => prev.map((p) => (p._id === id || p.id === id ? product : p)))
      setError(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update product"
      console.error("Error updating product:", errorMessage)
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteProduct = useCallback(async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      await productService.deleteProduct(id)
      setProducts((prev) => prev.filter((p) => p._id !== id && p.id !== id))
      setError(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete product"
      console.error("Error deleting product:", errorMessage)
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        createProduct,
        updateProduct,
        deleteProduct,
        fetchProducts,
        clearError,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within ProductProvider")
  }
  return context
}