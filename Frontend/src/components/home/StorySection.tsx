"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const StorySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

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

  return (
    <section ref={sectionRef} className="min-h-screen bg-ivory flex flex-col">
      {/* Header Section */}
      <div className="w-full py-16 px-6 md:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-serif text-charcoal mb-6">
            The OMSound Story
          </motion.h2>

          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-charcoal/70 font-light">
            A journey of craft, heritage, and healing that spans generations
          </motion.p>
        </motion.div>
      </div>

      {/* Main Content Section - Full Width */}
      <div className="flex-1 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="h-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 h-full min-h-[70vh]">
            {/* Image Section - 2/5 of width */}
            <motion.div variants={itemVariants} className="lg:col-span-2 relative overflow-hidden pl-8 md:pl-16">
              <div className="h-full py-8 md:py-12">
                <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ivory/10 z-10"></div>
                  <img
                    src="https://res.cloudinary.com/dei0ymk1p/image/upload/v1752235490/a-hand-hammered-bronze-singing-bowl-with_VJxo8W0HRy6DeW_tQhS34g_7S00IMavRD6yq3LLoqeC3Q_mobnyk.jpg"
                    alt="Artisan crafting a singing bowl"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </motion.div>

            {/* Text Section - 3/5 of width */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-3 flex flex-col justify-center px-8 md:px-16 py-12 bg-gradient-to-br from-ivory to-ivory/95"
            >
              <div className="max-w-3xl">
                <h3 className="text-3xl md:text-4xl font-serif text-charcoal mb-8 leading-tight">
                  From Ancient Tradition to Modern Wellness
                </h3>

                <div className="space-y-6 text-lg md:text-xl leading-relaxed">
                  <p className="text-justify text-charcoal/80">
                    For over three decades, our family has preserved the ancient art of crafting traditional singing
                    bowls in the Himalayan foothills of Nepal. Our artisans follow techniques passed down through
                    generations, using the same seven-metal alloy that has been the foundation of singing bowl craft for
                    centuries.
                  </p>

                  <p className="text-justify text-charcoal/80">
                    What began as a small workshop has grown into a global mission to share the healing resonance of
                    these remarkable instruments with the world. Each bowl requires over 30 hours of skilled handwork,
                    from the initial casting to the final hand-hammering that gives each piece its unique voice.
                  </p>

                  <p className="text-justify text-charcoal/80">
                    Today, OMSound Nepal bowls can be found in wellness centers, luxury spas, and private collections
                    across 45 countries, bringing the natural healing properties of Himalayan resonance to modern
                    lifestyles.
                  </p>
                </div>

                {/* Stats Section */}
                <div className="mt-12 grid grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-gold text-3xl md:text-4xl font-serif font-bold mb-2">30+</div>
                    <p className="text-charcoal/70 text-sm md:text-base">Years of craftsmanship</p>
                  </div>
                  <div className="text-center">
                    <div className="text-gold text-3xl md:text-4xl font-serif font-bold mb-2">45</div>
                    <p className="text-charcoal/70 text-sm md:text-base">Countries worldwide</p>
                  </div>
                  <div className="text-center">
                    <div className="text-gold text-3xl md:text-4xl font-serif font-bold mb-2">100%</div>
                    <p className="text-charcoal/70 text-sm md:text-base">Handmade in Nepal</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default StorySection
