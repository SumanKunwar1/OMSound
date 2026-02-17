const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export interface Product {
  _id?: string
  id: string
  name: string
  price: number
  // ✅ Waterproofing specific fields (REQUIRED)
  coverage: string // e.g., "250 sq ft"
  type: string // e.g., "Liquid Membrane", "Sheet", "Paint"
  application: string // e.g., "Roof", "Basement", "Bathroom"
  waterproofingRating: string // e.g., "Class A", "Class B", "Class C"
  durationYears: number // warranty duration
  // ✅ Common product fields
  images?: string[] // Array of product images
  description: string
  details?: string[]
  category?: string
  brand?: string
  rating?: number
  reviewCount?: number
  inStock?: boolean
  applicationInstructions?: string[]
  // ✅ Optional media
  audio?: string
  video?: string
  // ✅ SEO fields
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  // ✅ Timestamps
  createdAt?: string
  updatedAt?: string
}

class ProductService {
  private async makeRequest(url: string, options: RequestInit = {}): Promise<any> {
    try {
      // Add timeout to prevent hanging requests
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 30000) // 30 second timeout

      const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        signal: controller.signal,
        headers: {
          ...options.headers,
        },
      })

      clearTimeout(timeout)

      if (!response.ok) {
        let errorData = { message: "" }
        try {
          errorData = await response.json()
        } catch (e) {
          errorData = { message: `HTTP error! status: ${response.status}` }
        }

        console.error("API Error Response:", {
          status: response.status,
          statusText: response.statusText,
          data: errorData,
        })

        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          console.error("API request timeout")
          throw new Error("Request timeout - please try again")
        }
        console.error("API request failed:", error.message)
        throw error
      }
      throw new Error("Unknown error occurred during API request")
    }
  }

  async getProducts(): Promise<Product[]> {
    return this.makeRequest("/products")
  }

  async getProductsForShop(): Promise<Product[]> {
    return this.makeRequest("/products/shop")
  }

  async getProductById(id: string): Promise<Product> {
    return this.makeRequest(`/products/${id}`)
  }

  async createProduct(formData: FormData): Promise<Product> {
    // Validate that images exist before sending
    const images = formData.getAll("images")
    if (!images || images.length === 0) {
      throw new Error("At least one image is required")
    }

    // Validate FormData content
    const body = Object.fromEntries(formData)
    console.log("Creating product with data:", {
      ...body,
      images: `${images.length} images`,
    })

    return this.makeRequest("/products", {
      method: "POST",
      body: formData,
    })
  }

  async updateProduct(id: string, formData: FormData): Promise<Product> {
    console.log("Updating product:", id)
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

export const productService = new ProductService()
export default productService