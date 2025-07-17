"use client"

import { useEffect, useState } from "react"
import { seoService } from "../services/seo.service"

interface SEOData {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  structuredData?: object
  isActive: boolean
}

export const useSEOData = (path: string) => {
  const [seoData, setSeoData] = useState<SEOData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSEOData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Clean the path - remove leading slash if present
        const cleanPath = path.startsWith("/") ? path.slice(1) : path
        const seoPage = await seoService.getSEOPageByPath(cleanPath)

        setSeoData({
          title: seoPage.title,
          description: seoPage.description,
          keywords: Array.isArray(seoPage.keywords)
            ? seoPage.keywords
            : seoPage.keywords.split(",").map((k) => k.trim()),
          ogImage: seoPage.ogImage,
          structuredData: seoPage.structuredData,
          isActive: seoPage.isActive,
        })
      } catch (err) {
        console.error(`Error fetching SEO data for path: ${path}`, err)
        setError(err instanceof Error ? err.message : "Failed to load SEO data")

        // Fallback SEO data
        setSeoData(getDefaultSEO(path))
      } finally {
        setLoading(false)
      }
    }

    if (path) {
      fetchSEOData()
    }
  }, [path])

  return { seoData, loading, error }
}

// Default SEO data fallback
const getDefaultSEO = (path: string): SEOData => {
  const defaults: Record<string, SEOData> = {
    "/": {
      title: "OMSound Nepal - Authentic Himalayan Singing Bowls",
      description:
        "Discover authentic handcrafted Himalayan singing bowls for meditation, sound healing, and spiritual wellness. Premium quality bowls made by master artisans in Nepal.",
      keywords: ["singing bowls", "himalayan bowls", "meditation", "sound healing", "nepal", "tibetan bowls"],
      ogImage: "/images/hero-bowl.jpg",
      isActive: true,
    },
    "/about": {
      title: "About OMSound Nepal - Our Story & Mission",
      description:
        "Learn about OMSound Nepal's journey in preserving ancient Himalayan singing bowl traditions while bringing authentic healing instruments to the modern world.",
      keywords: ["about omsound", "nepal artisans", "singing bowl history", "himalayan craftsmanship"],
      ogImage: "/images/about-hero.jpg",
      isActive: true,
    },
    "/shop": {
      title: "Shop Authentic Singing Bowls - OMSound Nepal",
      description:
        "Browse our collection of handcrafted Himalayan singing bowls. Each bowl is unique in tone, size, and design. Free worldwide shipping on orders over $100.",
      keywords: ["buy singing bowls", "shop tibetan bowls", "meditation bowls", "sound therapy instruments"],
      ogImage: "/images/shop-collection.jpg",
      isActive: true,
    },
    "/sound-healing": {
      title: "Sound Healing Therapy - OMSound Nepal",
      description:
        "Experience transformative sound healing sessions with authentic Himalayan singing bowls. Reduce stress, improve sleep, and find inner peace through therapeutic sound.",
      keywords: ["sound healing", "sound therapy", "meditation sessions", "stress relief", "wellness"],
      ogImage: "/images/sound-healing.jpg",
      isActive: true,
    },
  }

  return (
    defaults[path] || {
      title: "OMSound Nepal",
      description: "Authentic Himalayan singing bowls and sound healing instruments",
      keywords: ["singing bowls", "nepal", "meditation"],
      isActive: true,
    }
  )
}
