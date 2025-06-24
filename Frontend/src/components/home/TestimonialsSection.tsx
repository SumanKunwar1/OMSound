import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../../data/testimonials';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={sectionRef} className="section bg-charcoal py-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title text-gold">Testimonials & Use Cases</h2>
          <p className="section-subtitle text-ivory/80">
            Hear from professionals who use our singing bowls in their practice
          </p>

          <div className="relative mt-16">
            {/* Navigation Arrows */}
            <div className="hidden md:block absolute z-10 left-0 top-1/2 transform -translate-y-1/2 -ml-6">
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-gold/10 text-gold hover:bg-gold/20 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
            </div>
            
            <div className="hidden md:block absolute z-10 right-0 top-1/2 transform -translate-y-1/2 -mr-6">
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-gold/10 text-gold hover:bg-gold/20 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            {/* Testimonial Cards */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={testimonial.id} 
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-navy/40 border border-gold/10 rounded-lg p-8 md:p-10">
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-xl text-ivory/90 italic mb-6">"{testimonial.quote}"</p>
                          <div>
                            <p className="font-serif text-gold text-lg">{testimonial.name}</p>
                            <p className="text-ivory/70">{testimonial.profession}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Mobile Navigation */}
            <div className="flex justify-center mt-8 space-x-2 md:hidden">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-gold' : 'bg-gold/30'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;