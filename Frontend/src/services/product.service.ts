const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

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

class ProductService {
  private async makeRequest(url: string, options: RequestInit = {}): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers: {
          ...options.headers,
        },
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
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

  async getProductsForShop(): Promise<Product[]> {
    return this.makeRequest("/products/shop")
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

export const productService = new ProductService()
export default productService
