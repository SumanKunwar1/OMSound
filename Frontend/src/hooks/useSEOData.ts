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
    "/faq": {
      title: "FAQ - Frequently Asked Questions | OMSound Nepal",
      description: "Find answers to common questions about Himalayan singing bowls, sound healing, orders, and more.",
      keywords: ["FAQ", "singing bowls questions", "sound healing FAQ", "OMSound Nepal support"],
      ogImage: "/images/faq-hero.jpg",
      isActive: true,
    },
    "/care-guide": {
      title: "Sound Bowl Care Guide - Maintain Your Himalayan Singing Bowl | OMSound Nepal",
      description:
        "Learn how to properly clean, store, and care for your Himalayan singing bowls to preserve their sound and longevity.",
      keywords: ["singing bowl care", "clean singing bowl", "store singing bowl", "himalayan bowl maintenance"],
      ogImage: "/images/care-guide-hero.jpg",
      isActive: true,
    },
    "/privacy-policy": {
      title: "Privacy Policy | OMSound Nepal",
      description: "Understand how OMSound Nepal collects, uses, and protects your personal information.",
      keywords: ["privacy policy", "data protection", "OMSound Nepal privacy", "user data"],
      ogImage: "/images/privacy-hero.jpg",
      isActive: true,
    },
    "/blog": {
      title: "Blog - Insights & Wisdom | OMSound Nepal",
      description: "Explore articles on sound healing, meditation, Himalayan culture, and the art of singing bowls.",
      keywords: ["sound healing blog", "meditation articles", "singing bowls insights", "himalayan culture"],
      ogImage: "/images/blog-hero.jpg",
      isActive: true,
    },
    "/careers": {
      title: "Careers - Join Our Team | OMSound Nepal",
      description: "Explore career opportunities at OMSound Nepal and become part of our mission to spread healing.",
      keywords: ["careers", "jobs", "hiring", "OMSound Nepal jobs", "sound healing careers"],
      ogImage: "/images/careers-hero.jpg",
      isActive: true,
    },
    "/press-media": {
      title: "Press & Media - OMSound Nepal",
      description: "Access press releases, media mentions, and brand assets for OMSound Nepal.",
      keywords: ["press", "media", "press kit", "OMSound Nepal news", "media contact"],
      ogImage: "/images/press-hero.jpg",
      isActive: true,
    },
    "/shipping-policy": {
      title: "Shipping Policy - OMSound Nepal",
      description: "Learn about our shipping methods, delivery times, and international shipping details.",
      keywords: ["shipping policy", "delivery", "international shipping", "order tracking"],
      ogImage: "/images/shipping-hero.jpg",
      isActive: true,
    },
    "/support-center": {
      title: "Support Center - How Can We Help? | OMSound Nepal",
      description: "Find answers to your questions and get support for your OMSound Nepal products and services.",
      keywords: ["support", "help center", "customer service", "troubleshooting"],
      ogImage: "/images/support-hero.jpg",
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
