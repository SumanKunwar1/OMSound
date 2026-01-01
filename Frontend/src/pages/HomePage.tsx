"use client"

import SEOHelmet from "../components/seo/SEOHelmet"
import { useSEOData } from "../hooks/useSEOData"
import HeroSection from "../components/home/HeroSection"
import StorySection from "../components/home/StorySection"
import HealingSection from "../components/home/HealingSection"
import FeaturedProducts from "../components/home/FeaturedProducts"
import CraftSection from "../components/home/CraftSection"
import ModernSection from "../components/home/ModernSection"
import FeaturedBrandsSection from "../components/home/FeaturedBrand"

const HomePage = () => {
  const { seoData, loading } = useSEOData("/")

  // Show loading state or render with default SEO if needed
  if (loading || !seoData) {
    return (
      <div>
        <SEOHelmet
          title="Trinity Waterproofing - Expert Waterproofing Solutions"
          description="Trinity Waterproofing offers top-notch waterproofing services and products to protect your property from water damage. Explore our solutions today!"
          keywords="waterproofing, property protection, water damage, waterproofing services, waterproofing products"
          url="https://trinitywaterproofing.com.np"
        />
        <HeroSection />
        <StorySection />
        <HealingSection />
        <FeaturedProducts />
        <FeaturedBrandsSection />
        <CraftSection />
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

  return (
    <div>
      <SEOHelmet
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        image={seoData.ogImage}
        type="website"
        structuredData={seoData.structuredData}
        url="https://omsoundnepal.com"
      />

      <HeroSection />
      <StorySection />
      <HealingSection />
      <FeaturedProducts />
      <FeaturedBrandsSection />
      <CraftSection />
      <ModernSection />

      {/* Free Shipping Banner */}
      <div className="bg-gold py-3">
        <div className="container-custom">
          <p className="text-center text-charcoal font-medium">Free worldwide shipping on all orders over $100</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
