import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export interface SEOPage {
  _id?: string
  pageName: string
  path: string
  title: string
  description: string
  keywords: string[] | string
  ogImage?: string
  isActive: boolean
  structuredData?: object
  createdAt?: string
  updatedAt?: string
}

export interface CreateSEOPageData {
  pageName: string
  path: string
  title: string
  description: string
  keywords: string[] | string
  ogImage?: string
  isActive: boolean
  structuredData?: object
}

export interface UpdateSEOPageData extends CreateSEOPageData {
  _id: string
}

interface ApiErrorResponse {
  message?: string
  errors?: Array<{ msg: string; param: string; value: any }>
}

// Type guard to check if error is an axios error
function isAxiosError(error: unknown): error is { response?: { data?: ApiErrorResponse } } {
  return (
    typeof error === "object" && error !== null && "response" in error && typeof (error as any).response === "object"
  )
}

class SEOService {
  private getAuthHeaders() {
    const token = localStorage.getItem("adminToken")
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  }

  private handleError(error: unknown, defaultMessage: string): never {
    console.error(defaultMessage, error)

    if (isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data
      if (errorData.errors) {
        throw new Error(errorData.errors.map((err) => err.msg).join(", "))
      }
      if (errorData.message) {
        throw new Error(errorData.message)
      }
    }

    throw new Error(defaultMessage)
  }

  async getAllSEOPages(): Promise<SEOPage[]> {
    try {
      const response = await axios.get<SEOPage[]>(`${API_BASE_URL}/admin/seo`, this.getAuthHeaders())
      return response.data
    } catch (error: unknown) {
      this.handleError(error, "Failed to fetch SEO pages")
    }
  }

  async getSEOPageByPath(path: string): Promise<SEOPage> {
    try {
      const response = await axios.get<SEOPage>(`${API_BASE_URL}/seo/${path}`)
      return response.data
    } catch (error: unknown) {
      this.handleError(error, "Failed to fetch SEO page")
    }
  }

  async createSEOPage(data: CreateSEOPageData): Promise<SEOPage> {
    try {
      const response = await axios.post<SEOPage>(`${API_BASE_URL}/admin/seo`, data, this.getAuthHeaders())
      return response.data
    } catch (error: unknown) {
      this.handleError(error, "Failed to create SEO page")
    }
  }

  async updateSEOPage(id: string, data: CreateSEOPageData): Promise<SEOPage> {
    try {
      const response = await axios.put<SEOPage>(`${API_BASE_URL}/admin/seo/${id}`, data, this.getAuthHeaders())
      return response.data
    } catch (error: unknown) {
      this.handleError(error, "Failed to update SEO page")
    }
  }

  async deleteSEOPage(id: string): Promise<void> {
    try {
      await axios.delete<{ message: string }>(`${API_BASE_URL}/admin/seo/${id}`, this.getAuthHeaders())
    } catch (error: unknown) {
      this.handleError(error, "Failed to delete SEO page")
    }
  }
}

export const seoService = new SEOService()
