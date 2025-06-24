import { MapPin, Mail, Phone } from 'lucide-react';
import SEOHelmet from '../components/seo/SEOHelmet';
import { seoData } from '../data/seoData';
import AnimatedSection from '../components/utils/AnimatedSection';

const AboutPage = () => {
  const seo = seoData.about;

  return (
    <div className="min-h-screen pt-24 bg-ivory">
      <SEOHelmet
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        image={seo.image}
        type={seo.type}
        url="https://omsoundnepal.com/about"
      />

      <div className="container-custom py-16">
        {/* Hero section */}
        <AnimatedSection>
          <div className="relative h-80 md:h-96 mb-16 rounded-xl overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/5993553/pexels-photo-5993553.jpeg" 
              alt="Himalayan mountains" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-navy/50 flex items-center justify-center">
              <h1 className="text-ivory font-serif text-4xl md:text-5xl">Our Story</h1>
            </div>
          </div>
        </AnimatedSection>
        
        {/* About section */}
        <div className="mb-24">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-serif text-charcoal mb-6">
                The Healing Resonance of the Himalayas
              </h2>
              <p className="text-charcoal/80 text-lg">
                OMSound Nepal bridges centuries of tradition with modern wellness practices, bringing authentic, 
                hand-crafted singing bowls from the Himalayan foothills to homes and healing spaces worldwide.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatedSection delay={0.1}>
              <div>
                <h3 className="text-xl font-serif text-charcoal mb-4">Our Heritage</h3>
                <p className="text-charcoal/80 mb-4">
                 OMSound Nepal began as a small workshop 
                  dedicated to preserving the ancient techniques of singing bowl creation. What started as 
                  a family tradition has grown into an artisan collective that maintains the highest standards 
                  of craftsmanship while reaching a global audience.
                </p>
                <p className="text-charcoal/80">
                  Each bowl requires weeks of skilled work—from selecting the perfect metal blend to the final 
                  tuning process. Our artisans have dedicated their lives to perfecting these techniques, some 
                  coming from families with over 400 years of metalworking history.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <div>
                <h3 className="text-xl font-serif text-charcoal mb-4">Our Mission</h3>
                <p className="text-charcoal/80 mb-4">
                  We believe in the power of sound to heal, transform, and bring balance to modern lives. Our mission 
                  extends beyond creating beautiful instruments—we aim to preserve Nepalese craftsmanship, provide 
                  sustainable livelihoods for artisan families, and share the therapeutic benefits of sound healing 
                  with the world.
                </p>
                <p className="text-charcoal/80">
                  Every OMSound Nepal product represents our commitment to authenticity and excellence. We work directly 
                  with wellness practitioners to ensure our instruments meet the needs of professional sound therapy 
                  while remaining accessible to individuals seeking to incorporate these practices into daily life.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
        
        {/* FAQ Section */}
        <AnimatedSection delay={0.3}>
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif text-charcoal mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-charcoal/80 max-w-2xl mx-auto">
                Everything you need to know about our singing bowls and sound healing
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-serif text-charcoal mb-3">What are singing bowls made of?</h3>
                <p className="text-charcoal/80">
                  Our singing bowls are crafted from a traditional seven-metal alloy that includes gold, silver, 
                  copper, iron, tin, lead, and zinc. Each metal contributes to the bowl's unique tonal quality and 
                  resonance. The exact proportions are part of our artisans' closely guarded knowledge, passed down 
                  through generations.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-serif text-charcoal mb-3">How do I choose the right bowl?</h3>
                <p className="text-charcoal/80">
                  Selecting a singing bowl is both practical and intuitive. Consider the purpose (meditation, sound therapy, 
                  decoration), the space where you'll use it, and which tone resonates with you. Smaller bowls typically 
                  produce higher tones, while larger bowls create deeper, longer-lasting sounds. We recommend listening 
                  to the sound samples on our product pages to find the tone that feels right for you.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-serif text-charcoal mb-3">How do I play a singing bowl?</h3>
                <p className="text-charcoal/80">
                  There are two main techniques: striking and rimming. To strike, gently tap the bowl's side with the padded 
                  end of the mallet. To rim, hold the bowl in your palm and run the mallet around the bowl's outer rim in a 
                  circular motion with consistent pressure. With practice, this creates a continuous "singing" sound. We 
                  provide detailed playing instructions with every purchase.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-serif text-charcoal mb-3">How should I care for my singing bowl?</h3>
                <p className="text-charcoal/80">
                  Singing bowls require minimal maintenance. Clean with a soft, dry cloth after use to remove fingerprints. 
                  Occasionally, you may use a small amount of lemon juice on a cloth to remove tarnish, followed by thorough 
                  drying. Store your bowl on its cushion in a dry place, away from extreme temperatures. With proper care, 
                  your bowl will maintain its beauty and sound quality for generations.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Contact Section */}
        <AnimatedSection delay={0.4}>
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif text-charcoal mb-4">
                Contact Us
              </h2>
              <p className="text-charcoal/80 max-w-2xl mx-auto">
                Have questions about our products or need assistance? Reach out to our team.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gold/10 text-gold rounded-full mb-4">
                  <MapPin />
                </div>
                <h3 className="font-serif text-lg text-charcoal mb-2">Visit Our Workshop</h3>
                <p className="text-charcoal/80">
                  Sanepa, Lalitpur<br />
                  Nepal
                </p>
                <p className="text-charcoal/60 mt-2 text-sm">
                  Open Monday-Friday, 10am-6pm
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gold/10 text-gold rounded-full mb-4">
                  <Mail />
                </div>
                <h3 className="font-serif text-lg text-charcoal mb-2">Email Us</h3>
                <p className="text-charcoal/80">
                  info@omsound.com
                </p>
                <p className="text-charcoal/60 mt-2 text-sm">
                  We typically respond within 24 hours
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gold/10 text-gold rounded-full mb-4">
                  <Phone />
                </div>
                <h3 className="font-serif text-lg text-charcoal mb-2">Call Us</h3>
                <p className="text-charcoal/80">
                  +977 1234 5678
                </p>
                <p className="text-charcoal/60 mt-2 text-sm">
                  Available 9am-5pm (GMT+5:45)
                </p>
              </div>
            </div>
            
            <div className="mt-12 bg-white rounded-lg shadow-md p-8">
              <h3 className="font-serif text-xl text-charcoal mb-6">Send Us a Message</h3>
              
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-1">
                    Your Name
                  </label>
                  <input 
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-charcoal/20 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1">
                    Email Address
                  </label>
                  <input 
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-charcoal/20 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-charcoal mb-1">
                    Subject
                  </label>
                  <input 
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 border border-charcoal/20 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="What is your message about?"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-1">
                    Message
                  </label>
                  <textarea 
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-charcoal/20 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="Type your message here"
                  ></textarea>
                </div>
                
                <div className="md:col-span-2">
                  <button type="submit" className="btn-primary">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default AboutPage;