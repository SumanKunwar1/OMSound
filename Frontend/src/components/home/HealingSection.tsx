"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const HealingSection = () => {
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  }

  const benefits = [
    {
      title: "Waterproofing Coatings",
      description:
        "Waterproofing coatings offer reliable protection against water damage by creating a strong, moisture-resistant barrier. Ideal for roofs, walls, and foundations, they ensure long-lasting durability.",
      icon: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
    },
    {
      title: "Membrane Waterproofing",
      description:
        "Membrane waterproofing provides a flexible, seamless barrier that effectively protects surfaces from water penetration. Perfect for roofs, basements, and foundations, it ensures enhanced durability and moisture resistance.",
      icon: "https://images.pexels.com/photos/3945630/pexels-photo-3945630.jpeg",
    },
    {
      title: "Repair Products",
      description:
        "Repair products are designed to fix and restore damaged surfaces, offering quick and effective solutions for cracks, leaks, and wear. These products ensure long-lasting results and help maintain the integrity of structures.",
      icon: "https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg",
    },
    {
      title: "Epoxy Products",
      description:
        "Epoxy products offer strong, durable solutions for bonding, coating, and repairing surfaces. Known for their resistance to wear, chemicals, and moisture, they are ideal for a wide range of applications in both commercial and industrial settings.",
      icon: "https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg",
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
            <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-serif text-gold mb-6 leading-tight">
              Trinity Waterproofing Products
            </motion.h2>

            <motion.div variants={itemVariants} className="w-24 h-1 bg-gold mx-auto mb-8"></motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-ivory/80 max-w-3xl mx-auto font-light leading-relaxed"
            >
              Premium solutions for lasting protection against water damage
            </motion.p>
          </div>

          {/* Benefits Grid */}
          <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-gradient-to-br from-navy/80 to-navy/60 backdrop-blur-sm border border-gold/30 rounded-2xl p-8 hover:border-gold/50 transition-all duration-300 shadow-2xl hover:shadow-gold/10"
              >
                {/* Card Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10 flex items-start gap-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg ring-2 ring-gold/20 group-hover:ring-gold/40 transition-all duration-300">
                      <img
                        src={benefit.icon || "/placeholder.svg"}
                        alt={benefit.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-serif text-gold mb-4 group-hover:text-gold/90 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-ivory/80 leading-relaxed text-lg group-hover:text-ivory/90 transition-colors duration-300">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Science Section */}
          <motion.div
            variants={itemVariants}
            className="relative bg-gradient-to-r from-navy/40 via-navy/60 to-navy/40 backdrop-blur-sm border border-gold/30 rounded-3xl p-12 shadow-2xl"
          >
            {/* Decorative Elements */}
            <div className="absolute top-6 left-6 w-3 h-3 bg-gold rounded-full animate-pulse"></div>
            <div className="absolute top-6 right-6 w-3 h-3 bg-gold rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gold rounded-full animate-pulse delay-500"></div>

            <div className="text-center mb-12">
              <h3 className="text-4xl md:text-5xl font-serif text-gold mb-6 leading-tight">
                Why Choose Trinity Waterproofing
              </h3>
              <div className="w-16 h-1 bg-gold mx-auto mb-8"></div>
              <p className="text-ivory/80 mb-8 text-xl leading-relaxed max-w-4xl mx-auto">
                With years of expertise and industry-leading products, Trinity Waterproofing delivers solutions that protect your investment for decades to come.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Superior Quality",
                  description:
                    "Our products are engineered with cutting-edge technology to provide maximum protection and durability against water damage and environmental stress.",
                },
                {
                  title: "Expert Installation",
                  description:
                    "Trinity's certified professionals ensure proper application for optimal performance and longevity of your waterproofing systems.",
                },
                {
                  title: "Long-Lasting Protection",
                  description:
                    "Backed by industry warranties, our solutions offer decades of reliable protection, giving you peace of mind and protecting your property value.",
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

export default HealingSection

