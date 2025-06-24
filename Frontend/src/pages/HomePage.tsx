import SEOHelmet from '../components/seo/SEOHelmet';
import { seoData } from '../data/seoData';
import HeroSection from '../components/home/HeroSection';
import StorySection from '../components/home/StorySection';
import HealingSection from '../components/home/HealingSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CraftSection from '../components/home/CraftSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ModernSection from '../components/home/ModernSection';

const HomePage = () => {
  const seo = seoData.home;

  return (
    <div>
      <SEOHelmet
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        image={seo.image}
        type={seo.type}
        structuredData={seo.structuredData}
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
          <p className="text-center text-charcoal font-medium">
            Free worldwide shipping on all orders over $100
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;