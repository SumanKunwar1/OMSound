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
      title: "Trinity Waterproofing - Expert Waterproofing Solutions in Nepal",
      description:
        "Trinity Waterproofing offers premium waterproofing solutions for residential and commercial properties. Comprehensive protection against water damage with 20+ years of expertise.",
      keywords: ["waterproofing", "Trinity Waterproofing", "Nepal", "bathroom waterproofing", "terrace waterproofing", "basement protection", "anti-termite treatment", "water damage prevention"],
      ogImage: "/images/hero-bowl.jpg",
      isActive: true,
    },
    "/about": {
      title: "About Trinity Waterproofing - Our Journey & Mission",
      description:
        "Learn about Trinity Waterproofing's mission to bring premium waterproofing solutions to the world. Discover our story, values, and commitment to quality craftsmanship.",
      keywords: ["about trinity waterproofing", "our story", "mission", "values", "craftsmanship"],
      ogImage: "/images/about-hero.jpg",
      isActive: true,
    },
    "/shop": {
      title: "Waterproofing Products - Trinity Waterproofing",
      description:
        "Explore our range of high-quality waterproofing products designed to protect your property from water damage. Shop now for durable solutions!",
      keywords: ["waterproofing products", "Trinity Waterproofing", "water damage protection", "durable waterproofing solutions"],
      ogImage: "/images/shop-collection.jpg",
      isActive: true,
    },
    "/services": {
      title: "Our Waterproofing Services - Trinity Waterproofing",
      description:
        "Discover the comprehensive waterproofing services offered by Trinity Waterproofing. From residential to commercial solutions, we ensure lasting protection against water damage.",
      keywords: ["waterproofing services", "Trinity Waterproofing", "residential waterproofing", "commercial waterproofing", "water damage protection"],
      ogImage: "/images/sound-healing.jpg",
      isActive: true,
    },
    "/faq": {
      title: "FAQ - Frequently Asked Questions | Trinity Waterproofing",
      description: "Find answers to common questions about waterproofing solutions, services, and more.",
      keywords: ["FAQ", "waterproofing questions", "Trinity Waterproofing FAQ", "waterproofing support"],
      ogImage: "/images/faq-hero.jpg",
      isActive: true,
    },
    "/care-guide": {
      title: "Care Guide - Maintaining Your Waterproofing Solutions | Trinity Waterproofing",
      description:
        "Learn how to properly clean, store, and care for your waterproofing solutions to preserve their effectiveness and longevity.",
      keywords: ["waterproofing care", "clean waterproofing", "store waterproofing", "waterproofing maintenance"],
      ogImage: "/images/care-guide-hero.jpg",
      isActive: true,
    },
    "/privacy-policy": {
      title: "Privacy Policy | Trinity Waterproofing",
      description: "Understand how Trinity Waterproofing collects, uses, and protects your personal information.",
      keywords: ["privacy policy", "data protection", "Trinity Waterproofing privacy", "user data"],
      ogImage: "/images/privacy-hero.jpg",
      isActive: true,
    },
    "/blog": {
      title: "Blog - Insights on Sound Healing & Himalayan Culture | Trinity Waterproofing",
      description: "trinitywaterproofing.com.np's blog features articles on waterproofing techniques, tips, and industry news.",
      keywords: ["waterproofing blog", "waterproofing articles", "Trinity Waterproofing insights", "industry news"],
      ogImage: "/images/blog-hero.jpg",
      isActive: true,
    },
    "/careers": {
      title: "Careers - Join Our Team | Trinity Waterproofing",
      description: "Explore career opportunities at Trinity Waterproofing and become part of our mission to provide quality waterproofing solutions.",
      keywords: ["careers", "jobs", "hiring", "Trinity Waterproofing jobs", "waterproofing careers"],
      ogImage: "/images/careers-hero.jpg",
      isActive: true,
    },
    "/press-media": {
      title: "Press & Media - Trinity Waterproofing",
      description: "Access press releases, media mentions, and brand assets for Trinity Waterproofing.",
      keywords: ["press", "media", "press kit", "Trinity Waterproofing news", "media contact"],
      ogImage: "/images/press-hero.jpg",
      isActive: true,
    },
    "/shipping-policy": {
      title: "Shipping Policy - Trinity Waterproofing",
      description: "Learn about our shipping methods, delivery times, and international shipping details.",
      keywords: ["shipping policy", "delivery", "international shipping", "order tracking"],
      ogImage: "/images/shipping-hero.jpg",
      isActive: true,
    },
    "/support-center": {
      title: "Support Center - How Can We Help? | Trinity Waterproofing",
      description: "Find answers to your questions and get support for your Trinity Waterproofing products and services.",
      keywords: ["support", "help center", "customer service", "troubleshooting"],
      ogImage: "/images/support-hero.jpg",
      isActive: true,
    },
  }

  return (
    defaults[path] || {
      title: "Trinity Waterproofing",
      description: " Premium waterproofing solutions for all your needs.",
      keywords: ["waterproofing", "nepal", "waterproofing solutions"],
      isActive: true,
    }
  )
}
