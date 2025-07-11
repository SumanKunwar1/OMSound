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
      title: "Stress Reduction",
      description:
        "The sound vibrations from our singing bowls help activate the body's relaxation response, reducing cortisol levels and easing tension in both mind and body.",
      icon: "https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg",
    },
    {
      title: "Pain & Anxiety Relief",
      description:
        "Regular sessions with singing bowls have been shown to reduce physical pain and alleviate symptoms of anxiety by promoting deep states of relaxation.",
      icon: "https://images.pexels.com/photos/7319163/pexels-photo-7319163.jpeg",
    },
    {
      title: "Deep Sleep Support",
      description:
        "The gentle tones create an ideal soundscape for falling into restful sleep, helping those with insomnia or disrupted sleep patterns find natural relief.",
      icon: "https://images.pexels.com/photos/6963756/pexels-photo-6963756.jpeg",
    },
    {
      title: "Meditation Enhancement",
      description:
        "Singing bowls create a focal point for attention during meditation, helping both beginners and experienced practitioners achieve deeper states of mindfulness.",
      icon: "https://images.pexels.com/photos/4325479/pexels-photo-4325479.jpeg",
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
              Healing With Sound
            </motion.h2>

            <motion.div variants={itemVariants} className="w-24 h-1 bg-gold mx-auto mb-8"></motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-ivory/80 max-w-3xl mx-auto font-light leading-relaxed"
            >
              Discover the scientifically-backed benefits of singing bowl therapy
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
                The Science Behind Sound Healing
              </h3>
              <div className="w-16 h-1 bg-gold mx-auto mb-8"></div>
              <p className="text-ivory/80 mb-8 text-xl leading-relaxed max-w-4xl mx-auto">
                Modern research has validated what traditional practices have known for centuries: the vibrations from
                singing bowls have measurable effects on our physical and mental state.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Brainwave Entrainment",
                  description:
                    "Studies show that singing bowl sounds can synchronize brain waves to alpha and theta states, associated with deep relaxation and meditation.",
                },
                {
                  title: "Vibrational Therapy",
                  description:
                    "The physical vibrations travel through tissue, stimulating cellular regeneration and promoting healing at a fundamental level.",
                },
                {
                  title: "Autonomic Balance",
                  description:
                    "Regular sound therapy helps restore balance to the autonomic nervous system, reducing fight-or-flight responses and promoting relaxation.",
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
