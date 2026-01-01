"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      profession: "Home Owner",
      location: "Kathmandu",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      rating: 5,
      quote: "Trinity waterproofing saved our home from severe water damage. The quality is exceptional and the installation team was extremely professional."
    },
    {
      id: 2,
      name: "Priya Sharma",
      profession: "Building Contractor",
      location: "Pokhara",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
      rating: 5,
      quote: "We've used Trinity products on multiple commercial projects. They're reliable, durable, and our clients always trust the quality."
    },
    {
      id: 3,
      name: "Amit Patel",
      profession: "Real Estate Developer",
      location: "Bhaktapur",
      image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
      rating: 5,
      quote: "The membrane waterproofing system has been outstanding on our residential projects. Zero complaints from our residents."
    },
    {
      id: 4,
      name: "Deepa Thapa",
      profession: "Property Manager",
      location: "Lalitpur",
      image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
      rating: 5,
      quote: "Trinity's epoxy coating transformed our basement. It looks professional and we haven't had a single leak since installation."
    },
    {
      id: 5,
      name: "Vikram Singh",
      profession: "Commercial Architect",
      location: "Kathmandu",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
      rating: 5,
      quote: "For every commercial project, Trinity is our first choice. The products perform exactly as promised, every single time."
    },
    {
      id: 6,
      name: "Sunita Gupta",
      profession: "Facility Manager",
      location: "Pokhara",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
      rating: 5,
      quote: "Outstanding customer service paired with superior products. Trinity made the entire process seamless from consultation to completion."
    }
  ]

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.ceil(testimonials.length / 3) - 1
        return prevIndex >= maxIndex ? 0 : prevIndex + 1
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const maxIndex = Math.ceil(testimonials.length / 3) - 1

  const nextTestimonials = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1))
    setIsAutoPlaying(false)
  }

  const prevTestimonials = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1))
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

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

  const getCurrentTestimonials = () => {
    const startIndex = currentIndex * 3
    return testimonials.slice(startIndex, startIndex + 3)
  }

  return (
    <section ref={sectionRef} className="min-h-screen bg-charcoal relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-gold rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-ivory rotate-45"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-gold rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 border border-ivory rounded-full animate-pulse delay-1000"></div>
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
              Client Success Stories
            </motion.h2>

            <motion.div variants={itemVariants} className="w-24 h-1 bg-gold mx-auto mb-8"></motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-ivory/80 max-w-3xl mx-auto font-light leading-relaxed"
            >
              Real results from satisfied customers across Nepal
            </motion.p>
          </div>

          {/* Testimonials Container */}
          <div className="relative">
            {/* Navigation Arrows */}
            <motion.button
              variants={itemVariants}
              onClick={prevTestimonials}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 z-20 w-14 h-14 bg-gradient-to-r from-gold to-gold/80 rounded-full flex items-center justify-center text-charcoal shadow-2xl hover:shadow-gold/20 transition-all duration-300"
            >
              <ChevronLeft size={24} />
            </motion.button>

            <motion.button
              variants={itemVariants}
              onClick={nextTestimonials}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 z-20 w-14 h-14 bg-gradient-to-r from-gold to-gold/80 rounded-full flex items-center justify-center text-charcoal shadow-2xl hover:shadow-gold/20 transition-all duration-300"
            >
              <ChevronRight size={24} />
            </motion.button>

            {/* Testimonials Grid */}
            <div className="overflow-hidden rounded-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {getCurrentTestimonials().map((testimonial, index) => (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                      className="group relative bg-gradient-to-br from-navy/60 to-navy/40 backdrop-blur-sm border border-gold/20 rounded-3xl p-8 shadow-2xl hover:border-gold/40 hover:shadow-gold/10 transition-all duration-500"
                    >
                      {/* Quote Icon */}
                      <div className="absolute top-6 right-6 w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                        <Quote className="w-6 h-6 text-gold" />
                      </div>

                      {/* Profile Section */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-gold/20 group-hover:ring-gold/40 transition-all duration-300">
                            <img
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gold rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-charcoal rounded-full"></div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-serif text-gold group-hover:text-gold/90 transition-colors duration-300">
                            {testimonial.name}
                          </h3>
                          <p className="text-ivory/70 text-sm group-hover:text-ivory/80 transition-colors duration-300">
                            {testimonial.profession}
                          </p>
                          <p className="text-ivory/50 text-xs mt-1">{testimonial.location}</p>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-ivory/90 leading-relaxed text-lg italic group-hover:text-ivory transition-colors duration-300">
                        "{testimonial.quote}"
                      </blockquote>

                      {/* Decorative Element */}
                      <div className="absolute bottom-6 left-8 w-12 h-1 bg-gradient-to-r from-gold to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-12 gap-3">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-gold shadow-lg shadow-gold/30" : "bg-gold/30 hover:bg-gold/50"
                  }`}
                  aria-label={`Go to testimonial group ${index + 1}`}
                />
              ))}
            </div>

            {/* Auto-play Indicator */}
            <div className="flex justify-center mt-6">
              <motion.button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isAutoPlaying
                    ? "bg-gold/20 text-gold border border-gold/30"
                    : "bg-ivory/10 text-ivory/70 border border-ivory/20"
                }`}
              >
                {isAutoPlaying ? "Auto-playing" : "Paused"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection