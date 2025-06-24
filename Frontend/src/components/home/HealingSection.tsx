import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const HealingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  const benefits = [
    {
      title: "Stress Reduction",
      description: "The sound vibrations from our singing bowls help activate the body's relaxation response, reducing cortisol levels and easing tension in both mind and body.",
      icon: "https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg"
    },
    {
      title: "Pain & Anxiety Relief",
      description: "Regular sessions with singing bowls have been shown to reduce physical pain and alleviate symptoms of anxiety by promoting deep states of relaxation.",
      icon: "https://images.pexels.com/photos/7319163/pexels-photo-7319163.jpeg"
    },
    {
      title: "Deep Sleep Support",
      description: "The gentle tones create an ideal soundscape for falling into restful sleep, helping those with insomnia or disrupted sleep patterns find natural relief.",
      icon: "https://images.pexels.com/photos/6963756/pexels-photo-6963756.jpeg"
    },
    {
      title: "Meditation Enhancement",
      description: "Singing bowls create a focal point for attention during meditation, helping both beginners and experienced practitioners achieve deeper states of mindfulness.",
      icon: "https://images.pexels.com/photos/4325479/pexels-photo-4325479.jpeg"
    }
  ];

  return (
    <section ref={sectionRef} className="section bg-navy text-ivory">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="section-title text-gold">
            Healing With Sound
          </motion.h2>
          
          <motion.p variants={itemVariants} className="section-subtitle text-ivory/80">
            Discover the scientifically-backed benefits of singing bowl therapy
          </motion.p>
          
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-navy/50 border border-gold/20 rounded-lg p-6 flex flex-col md:flex-row items-start gap-4"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={benefit.icon} 
                    alt={benefit.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-gold mb-2">{benefit.title}</h3>
                  <p className="text-ivory/80">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-16 bg-navy/30 border border-gold/20 rounded-lg p-8"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-serif text-gold mb-4">The Science Behind Sound Healing</h3>
              <p className="text-ivory/80 mb-6">
                Modern research has validated what traditional practices have known for centuries: the vibrations from singing bowls have measurable effects on our physical and mental state.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-gold font-serif text-xl font-semibold mb-2">Brainwave Entrainment</div>
                <p className="text-ivory/80 text-sm">
                  Studies show that singing bowl sounds can synchronize brain waves to alpha and theta states, associated with deep relaxation and meditation.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-gold font-serif text-xl font-semibold mb-2">Vibrational Therapy</div>
                <p className="text-ivory/80 text-sm">
                  The physical vibrations travel through tissue, stimulating cellular regeneration and promoting healing at a fundamental level.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-gold font-serif text-xl font-semibold mb-2">Autonomic Balance</div>
                <p className="text-ivory/80 text-sm">
                  Regular sound therapy helps restore balance to the autonomic nervous system, reducing fight-or-flight responses and promoting relaxation.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HealingSection;