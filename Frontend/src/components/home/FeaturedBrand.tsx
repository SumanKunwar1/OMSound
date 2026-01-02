"use client"

import { motion } from "framer-motion"

const FeaturedBrandsSection = () => {
  const brands = [
    { name: "Semitrone", logo: "https://res.cloudinary.com/dihev9qxc/image/upload/v1767254289/semitrone_lvlpq3.jpg" },
    { name: "Makphalt", logo: "https://res.cloudinary.com/dihev9qxc/image/upload/v1767254272/makphalt_ixupld.png" },
    { name: "Trinity", logo: "https://res.cloudinary.com/dihev9qxc/image/upload/v1767254272/logo_vfmrxy.png" },
    { name: "Dr. Fixit", logo: "https://res.cloudinary.com/dihev9qxc/image/upload/v1767254249/dr-fixit_utlju3.png" },
    { name: "Harrison", logo: "https://via.placeholder.com/180x80/8B0000/FFFFFF?text=HARRISON" },
  ]

  // Duplicate brands array for seamless loop
  const duplicatedBrands = [...brands, ...brands, ...brands]

  return (
    <section className="py-16 bg-navy text-ivory relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-gold mb-4">
            Trusted Brand Partners
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto"></div>
        </div>

        {/* Scrolling Logos Container */}
        <div className="relative overflow-hidden py-8">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-navy to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-navy to-transparent z-10"></div>

          {/* Scrolling Animation */}
          <motion.div
            className="flex gap-12 items-center"
            animate={{
              x: [0, -100 * brands.length - 12 * brands.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {duplicatedBrands.map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-44 h-28 bg-ivory/5 rounded-lg flex items-center justify-center p-4 border border-gold/10 hover:border-gold/30 transition-all duration-300"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedBrandsSection