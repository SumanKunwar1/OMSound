"use client"

import SEOHelmet from "../components/seo/SEOHelmet"
import HeroSection from "../components/home/HeroSection"
import StorySection from "../components/home/StorySection"
import HealingSection from "../components/home/HealingSection"
import FeaturedProducts from "../components/home/FeaturedProducts"
import CraftSection from "../components/home/CraftSection"
import ModernSection from "../components/home/ModernSection"
import FeaturedBrandsSection from "../components/home/FeaturedBrand"

const HomePage = () => {
  // Default Trinity Waterproofing SEO data
  const trinityDefaultSEO = {
    title: "Trinity Waterproofing - Expert Waterproofing Solutions in Nepal",
    description: "Trinity Waterproofing offers premium waterproofing solutions for residential and commercial properties. Comprehensive protection against water damage with 20+ years of expertise.",
    keywords: ["waterproofing", "Trinity Waterproofing", "Nepal", "bathroom waterproofing", "terrace waterproofing", "basement protection", "anti-termite treatment", "water damage prevention"],
    ogImage: "https://res.cloudinary.com/dihev9qxc/image/upload/v1767254272/logo_vfmrxy.png",
    url: "https://www.trinitywaterproofing.com.np",
    type: "website",
  }

  return (
    <div>
      {/* SEO Helmet with Trinity Waterproofing Data */}
      <SEOHelmet
        title={trinityDefaultSEO.title}
        description={trinityDefaultSEO.description}
        keywords={trinityDefaultSEO.keywords}
        image={trinityDefaultSEO.ogImage}
        type={trinityDefaultSEO.type}
        url={trinityDefaultSEO.url}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Story Section */}
      <StorySection />

      {/* Healing/Products Section */}
      <HealingSection />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Featured Brands */}
      <FeaturedBrandsSection />

      {/* Craft/Quality Process Section */}
      <CraftSection />

      {/* Modern Applications Section */}
      <ModernSection />

      {/* Free Shipping Banner */}
      <div className="bg-gold py-3">
        <div className="container-custom">
          <p className="text-center text-charcoal font-medium">Free shipping on all orders over NPR 10,000</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage