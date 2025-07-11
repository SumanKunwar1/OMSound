import  { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

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
      title: "Interior Decor",
      description: "Add warmth and unique aesthetic appeal to modern interiors with our decorative singing bowls that complement any design style.",
      image: "https://images.pexels.com/photos/3935347/pexels-photo-3935347.jpeg"
    },
    {
      title: "Therapy Rooms",
      description: "Create a therapeutic environment for clients with our professionally tuned bowls, designed for consistent tonal quality.",
      image: "https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg"
    },
    {
      title: "Luxury Wellness Spas",
      description: "Enhance premium treatments with the deep relaxation that our handcrafted singing bowls provide in spa environments.",
      image: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg"
    }
  ];

  return (
    <section ref={sectionRef} className="section bg-ivory">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 variants={itemVariants} className="section-title text-charcoal">
            Modern Meets Ancient
          </motion.h2>
          
          <motion.p variants={itemVariants} className="section-subtitle">
            How traditional healing instruments enhance contemporary environments
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {applications.map((item, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="card overflow-hidden group"
              >
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-charcoal mb-3">{item.title}</h3>
                  <p className="text-charcoal/80">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            variants={itemVariants} 
            className="bg-navy text-ivory rounded-lg overflow-hidden"
          >
            <div className="md:flex">
              <div className="md:w-2/5 relative">
                <img 
                  src="https://res.cloudinary.com/dei0ymk1p/image/upload/v1752235490/bringing-tranquility-to-contemporary-lif_NEhEtk6BS-6YDXRbwSnjqA_PUNVxB3aQEuUBGtdvd9pAw_drmgvh.jpg" 
                  alt="Modern wellness" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gold/20"></div>
              </div>
              <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-serif text-gold mb-6">
                  Bringing Tranquility to Contemporary Life
                </h3>
                <p className="text-ivory/80 mb-4">
                  In our fast-paced digital world, the need for mindful moments and natural wellness solutions has never been greater. Our singing bowls serve as both beautiful decor pieces and functional tools for bringing calm into busy modern lives.
                </p>
                <p className="text-ivory/80 mb-8">
                  From corporate offices seeking to create relaxation spaces for employees to luxury hotels enhancing guest experiences, OMSound Nepal bowls fit seamlessly into contemporary settings while providing an authentic connection to ancient wellness practices.
                </p>
                <div className="inline-block">
                  <Link to="/shop" className="btn-primary">
                    Explore the Collection
                  </Link>
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