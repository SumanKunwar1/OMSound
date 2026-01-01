"use client"

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ModernSection = () => {
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

  const applications = [
    {
      title: "Residential Properties",
      description: "Protect your home with our comprehensive waterproofing solutions for roofs, basements, and foundations, ensuring peace of mind for years to come.",
      image: "https://images.pexels.com/photos/3970673/pexels-photo-3970673.jpeg"
    },
    {
      title: "Commercial Buildings",
      description: "Safeguard commercial structures with industrial-grade coatings and membranes designed for high-traffic areas and demanding environments.",
      image: "https://images.pexels.com/photos/3912952/pexels-photo-3912952.jpeg"
    },
    {
      title: "Infrastructure Projects",
      description: "Protect critical infrastructure with advanced waterproofing systems engineered for bridges, tunnels, dams, and underground structures.",
      image: "https://images.pexels.com/photos/3945631/pexels-photo-3945631.jpeg"
    }
  ];

  return (
    <section ref={sectionRef} className="min-h-screen bg-ivory">
      <div className="relative z-10 px-6 md:px-12 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-serif text-charcoal mb-6 leading-tight text-center">
            Versatile Applications
          </motion.h2>
          
          <motion.div variants={itemVariants} className="w-24 h-1 bg-gold mx-auto mb-8"></motion.div>

          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-charcoal/70 max-w-3xl mx-auto text-center font-light leading-relaxed mb-16">
            Trinity waterproofing solutions for every structure and environment
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {applications.map((item, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-3xl shadow-2xl cursor-pointer"
              >
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent"></div>
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-serif text-ivory mb-2">{item.title}</h3>
                  <p className="text-ivory/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            variants={itemVariants} 
            className="bg-navy text-ivory rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="md:flex">
              <div className="md:w-2/5 relative">
                <img 
                  src="https://images.pexels.com/photos/3962649/pexels-photo-3962649.jpeg" 
                  alt="Waterproofing protection" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gold/20"></div>
              </div>
              <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-serif text-gold mb-6">
                  Protection That Lasts
                </h3>
                <p className="text-ivory/80 mb-4">
                  Water damage is one of the most costly and preventable problems affecting properties. Trinity Waterproofing solutions create lasting barriers that protect your investment from the foundation up.
                </p>
                <p className="text-ivory/80 mb-8">
                  Whether you're building new, renovating, or protecting existing structures, our products and services provide the expertise and reliability that come from over 20 years of industry leadership.
                </p>
                <div className="inline-block">
                  <button className="bg-gradient-to-r from-gold to-gold/80 hover:from-gold/90 hover:to-gold text-charcoal px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    View Our Solutions
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernSection;