import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const CraftSection = () => {
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
        >
          <motion.h2 variants={itemVariants} className="section-title text-charcoal">
            Why Nepalese Craft Matters
          </motion.h2>
          
          <motion.p variants={itemVariants} className="section-subtitle">
            A centuries-old tradition of metalwork excellence
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div variants={itemVariants} className="relative overflow-hidden rounded-lg">
              <img 
                src="https://images.pexels.com/photos/7968930/pexels-photo-7968930.jpeg" 
                alt="Traditional metalworking" 
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-navy/30 flex flex-col justify-end p-6">
                <h3 className="text-xl font-serif text-ivory mb-2">Traditional Methods</h3>
                <p className="text-ivory/90 text-sm">
                  Our artisans use techniques passed down through generations, working with tools and methods that have remained unchanged for centuries.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative overflow-hidden rounded-lg">
              <img 
                src="https://images.pexels.com/photos/7969365/pexels-photo-7969365.jpeg" 
                alt="Bowl polishing" 
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-navy/30 flex flex-col justify-end p-6">
                <h3 className="text-xl font-serif text-ivory mb-2">Seven-Metal Alloy</h3>
                <p className="text-ivory/90 text-sm">
                  Each bowl is made from a precise combination of seven metals, creating the perfect resonance and durability that has made Nepalese bowls world-renowned.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative overflow-hidden rounded-lg">
              <img 
                src="https://images.pexels.com/photos/7969343/pexels-photo-7969343.jpeg" 
                alt="Hand hammering" 
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-navy/30 flex flex-col justify-end p-6">
                <h3 className="text-xl font-serif text-ivory mb-2">Expert Tuning</h3>
                <p className="text-ivory/90 text-sm">
                  Through the meticulous process of hand-hammering, each bowl is carefully tuned to produce specific frequencies known for their therapeutic properties.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            variants={itemVariants}
            className="bg-navy/5 border border-gold/20 rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center"
          >
            <div className="md:w-3/5 mb-8 md:mb-0 md:mr-8">
              <h3 className="text-2xl md:text-3xl font-serif text-charcoal mb-4">
                Supporting Artisan Livelihoods
              </h3>
              <p className="text-charcoal/80 mb-4">
                Every purchase directly supports Nepalese artisan families, ensuring this craft tradition continues to thrive. We maintain fair trade practices and invest in training the next generation of craftspeople.
              </p>
              <p className="text-charcoal/80 mb-8">
                Our workshop in the Kathmandu Valley employs over 25 skilled artisans, many of whom come from families with centuries of metalwork tradition.
              </p>
              <div className="inline-block">
                <Link to="/about" className="btn-primary">
                  Learn More About Our Artisans
                </Link>
              </div>
            </div>
            
            <div className="md:w-2/5">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/10377406/pexels-photo-10377406.jpeg" 
                  alt="Nepalese artisan" 
                  className="rounded-lg w-full shadow-lg"
                />
                <div className="absolute bottom-4 left-4 bg-gold text-charcoal py-1 px-3 rounded-full text-sm font-semibold">
                  100% Made in Nepal
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CraftSection;