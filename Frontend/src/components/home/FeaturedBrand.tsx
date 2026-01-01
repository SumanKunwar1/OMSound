"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const FeaturedBrandsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  }

  // Brand logos with placeholder colors representing typical brand colors
  const brands = [
    {
      name: "Makphalt",
      logo: "https://via.placeholder.com/180x80/1a1a1a/FFD700?text=MAKPHALT",
      category: "Bituminous Solutions",
    },
    {
      name: "Fevicole",
      logo: "https://via.placeholder.com/180x80/FF6B35/FFFFFF?text=FEVICOLE",
      category: "Adhesives & Bonding",
    },
    {
      name: "Dr. Fixit",
      logo: "https://via.placeholder.com/180x80/003087/FFFFFF?text=Dr.FIXIT",
      category: "Waterproofing",
    },
    {
      name: "Semtrone",
      logo: "https://via.placeholder.com/180x80/1E90FF/FFFFFF?text=SEMTRONE",
      category: "Protective Coatings",
    },
    {
      name: "Harrison",
      logo: "https://via.placeholder.com/180x80/8B0000/FFFFFF?text=HARRISON",
      category: "Premium Paints",
    },
    {
      name: "Asian Paints",
      logo: "https://via.placeholder.com/180x80/2E5C8A/FFFFFF?text=Asian+Paints",
      category: "Waterproof Coatings",
    },
  ]

  return (
    <section ref={sectionRef} className="min-h-screen bg-navy text-ivory relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-gold rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-gold rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-gold rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 border border-gold rounded-full"></div>
      </div>

      <div className="relative z-10 px-6 md:px-12 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Header Section */}
          <div className="text-center mb-20">
            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-7xl font-serif text-gold mb-6 leading-tight"
            >
              Trusted Partnerships
            </motion.h2>

            <motion.div variants={itemVariants} className="w-24 h-1 bg-gold mx-auto mb-8"></motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-ivory/80 max-w-3xl mx-auto font-light leading-relaxed"
            >
              Trinity Waterproofing partners with industry-leading brands to deliver superior protection
            </motion.p>
          </div>

          {/* Brands Grid */}
          <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
            {brands.map((brand, index) => (
              <motion.div
                key={index}
                variants={logoVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-gradient-to-br from-navy/80 to-navy/60 backdrop-blur-sm border border-gold/30 rounded-2xl p-8 hover:border-gold/50 transition-all duration-300 shadow-2xl hover:shadow-gold/10"
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6">
                  {/* Logo Container */}
                  <div className="w-full h-32 rounded-xl overflow-hidden bg-ivory/5 flex items-center justify-center group-hover:bg-ivory/10 transition-colors duration-300">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Brand Info */}
                  <div className="text-center">
                    <h3 className="text-2xl font-serif text-gold mb-2 group-hover:text-gold/90 transition-colors duration-300">
                      {brand.name}
                    </h3>
                    <p className="text-ivory/70 text-sm group-hover:text-ivory/90 transition-colors duration-300">
                      {brand.category}
                    </p>
                  </div>

                  {/* Decorative Dots */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Section */}
          <motion.div
            variants={itemVariants}
            className="relative bg-gradient-to-r from-navy/40 via-navy/60 to-navy/40 backdrop-blur-sm border border-gold/30 rounded-3xl p-12 shadow-2xl"
          >
            {/* Decorative Elements */}
            <div className="absolute top-6 left-6 w-3 h-3 bg-gold rounded-full animate-pulse"></div>
            <div className="absolute top-6 right-6 w-3 h-3 bg-gold rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gold rounded-full animate-pulse delay-500"></div>

            <div className="text-center mb-8">
              <h3 className="text-4xl md:text-5xl font-serif text-gold mb-6 leading-tight">
                Quality You Can Trust
              </h3>
              <div className="w-16 h-1 bg-gold mx-auto mb-8"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Premium Materials",
                  description:
                    "We exclusively use products from the most trusted brands in the waterproofing and coating industry, ensuring superior quality and performance.",
                },
                {
                  title: "Industry Standards",
                  description:
                    "All our partner brands meet rigorous international quality standards and certifications, guaranteeing reliability and durability.",
                },
                {
                  title: "Proven Track Record",
                  description:
                    "Our partnerships are built on years of proven performance across thousands of successful projects in diverse environments.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center group hover:transform hover:scale-105 transition-all duration-300"
                >
                  <div className="bg-gradient-to-b from-gold/10 to-transparent rounded-2xl p-6 mb-4 group-hover:from-gold/20 transition-all duration-300">
                    <div className="text-gold font-serif text-2xl font-semibold mb-4 group-hover:text-gold/90 transition-colors duration-300">
                      {item.title}
                    </div>
                    <p className="text-ivory/80 leading-relaxed group-hover:text-ivory/90 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedBrandsSection