"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

const CraftSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
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

  const craftSteps = [
    {
      title: "Traditional Methods",
      description:
        "Our artisans use techniques passed down through generations, working with tools and methods that have remained unchanged for centuries.",
      image: "https://res.cloudinary.com/dei0ymk1p/image/upload/v1752235490/Our_Story_umefkv.jpg",
      step: "01",
    },
    {
      title: "Hand-Hammered Bronze",
      description:
        "Expertly shaped from pure bronze, each bowl offers deep, resonant sound and lasting quality through traditional Nepalese craftsmanship.",
      image:
        "https://res.cloudinary.com/dei0ymk1p/image/upload/v1752239930/nepalese-artisan-crafting-a-singing-bowl_6vfMS-WMQiuKj-yd7nC2ug_x40bXkH1Q5SBHIjQhXUSMg_gqsfh3.jpg",
      step: "02",
    },
    {
      title: "Expert Tuning",
      description:
        "Through the meticulous process of hand-hammering, each bowl is carefully tuned to produce specific frequencies known for their therapeutic properties.",
      image:
        "https://res.cloudinary.com/dei0ymk1p/image/upload/v1752240011/skilled-nepalese-artisan-tuning-a-hand-h_fgW1_McySeOBMLeNbDL4Rg_yd9jMoGhTHammUiNZpQ0VQ_ldiaba.jpg",
      step: "03",
    },
  ]

  return (
    <section ref={sectionRef} className="min-h-screen bg-ivory relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-32 left-16 w-40 h-40 border-2 border-charcoal rounded-full"></div>
        <div className="absolute top-20 right-20 w-24 h-24 border border-gold rotate-45"></div>
        <div className="absolute bottom-40 left-1/3 w-32 h-32 border border-charcoal rounded-full"></div>
        <div className="absolute bottom-20 right-32 w-20 h-20 border-2 border-gold rotate-12"></div>
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
              className="text-5xl md:text-5xl font-serif text-charcoal mb-6 leading-tight"
            >
              Why Nepalese Craft Matters
            </motion.h2>

            <motion.div variants={itemVariants} className="w-24 h-1 bg-gold mx-auto mb-8"></motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-charcoal/70 max-w-3xl mx-auto font-light leading-relaxed"
            >
              A centuries-old tradition of metalwork excellence
            </motion.p>
          </div>

          {/* Craft Process Cards */}
          <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {craftSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group relative overflow-hidden rounded-3xl shadow-2xl cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={step.image || "/placeholder.svg"}
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent group-hover:from-navy/95 transition-all duration-500"></div>

                  {/* Step Number */}
                  <div className="absolute top-6 right-6 w-16 h-16 bg-gold/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
                    <span className="text-charcoal font-serif font-bold text-xl">{step.step}</span>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <motion.h3
                      initial={{ y: 20, opacity: 0.8 }}
                      animate={{
                        y: hoveredCard === index ? 0 : 20,
                        opacity: hoveredCard === index ? 1 : 0.9,
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-2xl font-serif text-ivory mb-4 leading-tight"
                    >
                      {step.title}
                    </motion.h3>

                    <motion.p
                      initial={{ y: 30, opacity: 0 }}
                      animate={{
                        y: hoveredCard === index ? 0 : 30,
                        opacity: hoveredCard === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="text-ivory/90 leading-relaxed"
                    >
                      {step.description}
                    </motion.p>

                    {/* Interactive Element */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: hoveredCard === index ? 1 : 0,
                        opacity: hoveredCard === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="mt-4 w-12 h-1 bg-gold rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Artisan Support Section */}
          <motion.div
            variants={itemVariants}
            className="relative bg-gradient-to-br from-charcoal/5 via-navy/5 to-gold/5 backdrop-blur-sm border border-gold/20 rounded-3xl p-12 shadow-2xl overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-8 left-8 w-6 h-6 border-2 border-gold rotate-45"></div>
              <div className="absolute top-8 right-8 w-4 h-4 bg-charcoal rounded-full"></div>
              <div className="absolute bottom-8 left-1/4 w-5 h-5 border border-charcoal rounded-full"></div>
              <div className="absolute bottom-8 right-1/4 w-3 h-3 bg-gold rounded-full"></div>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
              {/* Text Content */}
              <div className="lg:w-3/5">
                <motion.h3
                  variants={itemVariants}
                  className="text-4xl md:text-5xl font-serif text-charcoal mb-8 leading-tight"
                >
                  Supporting Artisan Livelihoods
                </motion.h3>

                <div className="space-y-6 text-lg leading-relaxed">
                  <motion.p variants={itemVariants} className="text-charcoal/80">
                    Every purchase directly supports Nepalese artisan families, ensuring this craft tradition continues
                    to thrive. We maintain fair trade practices and invest in training the next generation of
                    craftspeople.
                  </motion.p>

                  <motion.p variants={itemVariants} className="text-charcoal/80">
                    Our workshop in the Kathmandu Valley employs over 25 skilled artisans, many of whom come from
                    families with centuries of metalwork tradition.
                  </motion.p>
                </div>

                {/* Stats */}
                <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 my-10">
                  <div className="text-center">
                    <div className="text-3xl font-serif font-bold text-gold mb-2">25+</div>
                    <p className="text-charcoal/70 text-sm">Skilled Artisans</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-serif font-bold text-gold mb-2">100%</div>
                    <p className="text-charcoal/70 text-sm">Fair Trade</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-serif font-bold text-gold mb-2">30+</div>
                    <p className="text-charcoal/70 text-sm">Years Experience</p>
                  </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <button className="bg-gradient-to-r from-gold to-gold/80 hover:from-gold/90 hover:to-gold text-charcoal px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    Learn More About Our Artisans
                  </button>
                </motion.div>
              </div>

              {/* Image Section */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} className="lg:w-2/5 relative group">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src="https://images.pexels.com/photos/10377406/pexels-photo-10377406.jpeg"
                    alt="Nepalese artisan"
                    className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badge */}
                  <div className="absolute bottom-6 left-6 bg-gold/95 backdrop-blur-sm text-charcoal py-3 px-6 rounded-full font-semibold shadow-lg group-hover:bg-gold transition-colors duration-300">
                    100% Made in Nepal
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-6 right-6 w-8 h-8 border-2 border-ivory/50 rounded-full group-hover:border-ivory transition-colors duration-300"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gold/20 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-charcoal/20 rounded-full animate-pulse delay-1000"></div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CraftSection
