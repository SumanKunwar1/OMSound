import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const StorySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section ref={sectionRef} className="section bg-ivory">
      <div className="container-custom">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="section-title text-charcoal">
            The OMSound Story
          </motion.h2>
          
          <motion.p variants={itemVariants} className="section-subtitle">
            A journey of craft, heritage, and healing that spans generations
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <motion.div variants={itemVariants}>
              <img 
                src="https://images.pexels.com/photos/7969331/pexels-photo-7969331.jpeg" 
                alt="Artisan crafting a singing bowl" 
                className="rounded-lg w-full h-auto object-cover shadow-lg mb-8 md:mb-0"
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-col justify-center">
              <h3 className="text-2xl font-serif text-charcoal mb-6">From Ancient Tradition to Modern Wellness</h3>
              <p className="mb-4 text-charcoal/80">
                For over three decades, our family has preserved the ancient art of crafting traditional singing bowls in the Himalayan foothills of Nepal. Our artisans follow techniques passed down through generations, using the same seven-metal alloy that has been the foundation of singing bowl craft for centuries.
              </p>
              <p className="mb-4 text-charcoal/80">
                What began as a small workshop has grown into a global mission to share the healing resonance of these remarkable instruments with the world. Each bowl requires over 30 hours of skilled handwork, from the initial casting to the final hand-hammering that gives each piece its unique voice.
              </p>
              <p className="text-charcoal/80">
                Today, OMSound Nepal bowls can be found in wellness centers, luxury spas, and private collections across 45 countries, bringing the natural healing properties of Himalayan resonance to modern lifestyles.
              </p>
            </motion.div>
          </div>
          
          <motion.div variants={itemVariants} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-gold text-4xl font-serif font-bold mb-2">30+</div>
              <p className="text-charcoal/80">Years of craftsmanship</p>
            </div>
            <div className="text-center">
              <div className="text-gold text-4xl font-serif font-bold mb-2">45</div>
              <p className="text-charcoal/80">Countries worldwide</p>
            </div>
            <div className="text-center">
              <div className="text-gold text-4xl font-serif font-bold mb-2">100%</div>
              <p className="text-charcoal/80">Handmade in Nepal</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StorySection;