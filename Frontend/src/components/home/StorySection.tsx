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
            The Trinity Waterproofing Story
          </motion.h2>

          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-charcoal/70 font-light">
            A commitment to protection, durability, and excellence built on proven waterproofing expertise.
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
                    src="https://res.cloudinary.com/dihev9qxc/image/upload/v1767255187/a-cinematic-wide-angle-photograph-of-a-s_OGYDdWv1TVavm8RZbvV-Ag_CQNhXncoS-6h1RDWCqwemw_widjot.jpg"
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
                  From Proven Techniques to Modern Waterproofing Solutions
                </h3>

                <div className="space-y-6 text-lg md:text-xl leading-relaxed">
  <p className="text-justify text-charcoal/80">
    At Trinity Waterproofing, we specialize in delivering reliable and high-performance waterproofing solutions designed
    to protect residential, commercial, and industrial structures. Our expertise is built on proven techniques and
    industry knowledge, ensuring effective protection against water intrusion and moisture-related damage.
  </p>

  <p className="text-justify text-charcoal/80">
    With a comprehensive range of premium-grade products—including waterproofing coatings, membrane systems, repair
    materials, and epoxy solutions—we address everything from basement leak prevention to rooftop durability and
    structural reinforcement. Each solution is carefully selected and applied to deliver long-lasting performance and
    strength.
  </p>

  <p className="text-justify text-charcoal/80">
    Today, Trinity Waterproofing is trusted by homeowners, contractors, and businesses seeking dependable protection and
    peace of mind. Driven by innovation, quality, and customer satisfaction, we remain committed to helping our clients
    build and maintain structures that stand resilient against the elements.
  </p>
</div>

                {/* Stats Section */}
<div className="mt-12 grid grid-cols-3 gap-8">
  <div className="text-center">
    <div className="text-gold text-3xl md:text-4xl font-serif font-bold mb-2">20+</div>
    <p className="text-charcoal/70 text-sm md:text-base">Years of Expertise</p>
  </div>
  <div className="text-center">
    <div className="text-gold text-3xl md:text-4xl font-serif font-bold mb-2">500+</div>
    <p className="text-charcoal/70 text-sm md:text-base">Projects Completed</p>
  </div>
  <div className="text-center">
    <div className="text-gold text-3xl md:text-4xl font-serif font-bold mb-2">99%</div>
    <p className="text-charcoal/70 text-sm md:text-base">Client Satisfaction</p>
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
