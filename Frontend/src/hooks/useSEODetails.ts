"use client"

import { useEffect, useState } from "react"
import axios from "axios"

interface SEODetails {
  _id?: string
  pageName: string
  path: string
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  isActive: boolean
  structuredData?: object
  createdAt?: string
  updatedAt?: string
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const useSEODetails = (path: string) => {
  const [seoDetails, setSeoDetails] = useState<SEODetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSEODetails = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await axios.get<SEODetails>(`${API_BASE_URL}/seo/${path}`)
        setSeoDetails(response.data)
      } catch (err) {
        console.error("Error fetching SEO details:", err)
        setError("Failed to load SEO details")
        setSeoDetails(null)
      } finally {
        setLoading(false)
      }
    }

    if (path) {
      fetchSEODetails()
    }
  }, [path])

  return { seoDetails, loading, error }
}

export default useSEODetails
