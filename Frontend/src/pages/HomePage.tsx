"use client"

import SEOHelmet from "../components/seo/SEOHelmet"
import { useSEOData } from "../hooks/useSEOData"
import HeroSection from "../components/home/HeroSection"
import StorySection from "../components/home/StorySection"
import HealingSection from "../components/home/HealingSection"
import FeaturedProducts from "../components/home/FeaturedProducts"
import CraftSection from "../components/home/CraftSection"
import TestimonialsSection from "../components/home/TestimonialsSection"
import ModernSection from "../components/home/ModernSection"

const HomePage = () => {
  const { seoData, loading } = useSEOData("/")

  // Show loading state or render with default SEO if needed
  if (loading || !seoData) {
    return (
      <div>
        <SEOHelmet
          title="OMSound Nepal - Authentic Himalayan Singing Bowls"
          description="Discover authentic handcrafted Himalayan singing bowls for meditation, sound healing, and spiritual wellness."
          keywords="singing bowls, himalayan bowls, meditation, sound healing, nepal"
          url="https://omsoundnepal.com"
        />
        <HeroSection />
        <StorySection />
        <HealingSection />
        <FeaturedProducts />
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
      <CraftSection />
      <TestimonialsSection />
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
