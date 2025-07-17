"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Brush, Sun, Cloud, Music, Droplet, Shield, Lightbulb, Sparkles, ChevronDown } from "lucide-react"
import SEOHelmet from "../../components/seo/SEOHelmet"
import { useSEOData } from "../../hooks/useSEOData"
import { AnimatePresence } from "framer-motion"

const SoundBowlCareGuidePage = () => {
  const { seoData } = useSEOData("/care-guide")
  const [activeTip, setActiveTip] = useState<number | null>(null)

  const careSteps = [
    {
      icon: Brush,
      title: "Cleaning Your Bowl",
      description:
        "Gently wipe with a soft, dry cloth after each use to remove oils and dust. For deeper cleaning, use a slightly damp cloth with mild soap, then dry immediately.",
      tip: "Avoid harsh chemicals or abrasive materials, as they can damage the bowl's finish and sound quality.",
      image:
        "https://res.cloudinary.com/dei0ymk1p/image/upload/v1752241709/a-photograph-of-an-elegant-bronze-singin__qn7sFHYTIqpdP7WnFkp4g_LYhkjWLnTeCqR80Yrl-J-w_vmpzbw.jpg?height=400&width=600",
    },
    {
      icon: Cloud,
      title: "Proper Storage",
      description:
        "Store your bowl in a dry, safe place away from direct sunlight, extreme temperatures, and humidity. Use a soft cushion or cloth inside to prevent scratches.",
      tip: "Consider a dedicated silk pouch or a padded case for long-term storage or travel to protect it from impacts.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      icon: Music,
      title: "Playing Techniques",
      description:
        "Use the appropriate mallet for your bowl. Strike gently or rub evenly around the rim. Experiment with pressure and speed to find the optimal sound.",
      tip: "Never force the sound. A gentle, consistent approach yields the best results and protects the bowl from damage.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      icon: Shield,
      title: "Handling with Care",
      description:
        "Always handle your singing bowl with clean hands. Avoid dropping it or striking it against hard surfaces, as this can cause dents or cracks.",
      tip: "When moving your bowl, always support it from the bottom. Avoid holding it by the rim, especially for larger bowls.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      icon: Droplet,
      title: "Moisture & Oxidation",
      description:
        "Protect your bowl from moisture. If it gets wet, dry it immediately. Over time, some bowls may develop a natural patina; this is normal and does not affect sound.",
      tip: "For bronze bowls, a light application of mineral oil can help prevent excessive oxidation, but always test on a small, inconspicuous area first.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      icon: Sun,
      title: "Energetic Cleansing",
      description:
        "Beyond physical care, you can energetically cleanse your bowl by placing it under moonlight, using sage smudging, or setting positive intentions.",
      tip: "Regular energetic cleansing helps maintain the bowl's vibrational purity and enhances its healing properties.",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  const defaultSEO = {
    title: "Sound Bowl Care Guide - Maintain Your Himalayan Singing Bowl | OMSound Nepal",
    description:
      "Learn how to properly clean, store, and care for your Himalayan singing bowls to preserve their sound and longevity.",
    keywords: ["singing bowl care", "clean singing bowl", "store singing bowl", "himalayan bowl maintenance"],
    ogImage: "/images/care-guide-hero.jpg",
  }

  const currentSEO = seoData || defaultSEO

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-indigo-900 to-purple-900 text-ivory pt-24">
      <SEOHelmet
        title={currentSEO.title}
        description={currentSEO.description}
        keywords={currentSEO.keywords}
        image={currentSEO.ogImage}
        type="website"
        structuredData={seoData?.structuredData}
        url="https://omsoundnepal.com/care-guide"
      />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 animate-pulse" />
        <div className="container-custom relative z-10">
          <h1 className="text-6xl md:text-8xl font-serif mb-6 bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent">
            Sound Bowl Care Guide
          </h1>
          <p className="text-xl md:text-2xl text-ivory/80 max-w-3xl mx-auto mb-10">
            Preserve the sacred sound and longevity of your Himalayan singing bowls with our expert care guide.
          </p>
          <motion.a
            href="#care-steps"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-gold to-yellow-400 text-navy px-10 py-4 rounded-full font-semibold hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Caring <ChevronDown className="w-5 h-5" />
          </motion.a>
        </div>
      </motion.div>

      {/* Care Steps Section */}
      <div id="care-steps" className="container-custom py-16">
        <h2 className="text-5xl font-serif text-center text-gold mb-16">Essential Care Steps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {careSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-navy/50 backdrop-blur-sm rounded-2xl p-8 border border-gold/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="flex items-center justify-center w-20 h-20 bg-gold/20 text-gold rounded-full mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-semibold text-gold text-center mb-4">{step.title}</h3>
              <p className="text-ivory/80 text-center leading-relaxed mb-6">{step.description}</p>
              <motion.button
                onClick={() => setActiveTip(activeTip === index ? null : index)}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full border border-gold/50 text-gold hover:bg-gold hover:text-navy transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Lightbulb className="w-5 h-5" />
                {activeTip === index ? "Hide Tip" : "Expert Tip"}
              </motion.button>
              <AnimatePresence>
                {activeTip === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 p-4 bg-gold/10 rounded-lg text-ivory/70 text-sm border border-gold/30"
                  >
                    <Sparkles className="w-4 h-4 inline-block mr-2 text-yellow-300" />
                    {step.tip}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Visual Guide Section */}
      <div className="container-custom py-16">
        <h2 className="text-5xl font-serif text-center text-gold mb-16">Visual Care Guide</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-gold/20"
          >
            <img
              src="https://res.cloudinary.com/dei0ymk1p/image/upload/v1752241709/a-photograph-of-an-elegant-bronze-singin__qn7sFHYTIqpdP7WnFkp4g_LYhkjWLnTeCqR80Yrl-J-w_vmpzbw.jpg?height=600&width=800"
              alt="Cleaning a singing bowl"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent flex items-end p-8">
              <h3 className="text-3xl font-semibold text-ivory">Step 1: Gentle Cleaning</h3>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-ivory/80 text-lg leading-relaxed"
          >
            <p>
              Maintaining the pristine condition and resonant sound of your Himalayan singing bowl is crucial for its
              longevity and your healing practice. Our visual guide walks you through the essential steps.
            </p>
            <p>
              Start with gentle cleaning using a soft, dry cloth. For stubborn spots, a slightly damp cloth with a tiny
              amount of mild, non-abrasive soap can be used, but always ensure to dry the bowl immediately and
              thoroughly to prevent water marks or oxidation.
            </p>
            <p>
              Proper storage is equally important. Keep your bowl in a stable, dry environment, away from direct
              sunlight or extreme temperature fluctuations. A soft cushion or a dedicated silk pouch will protect its
              surface from scratches and dings.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="py-20 text-center bg-gradient-to-r from-gold/5 to-yellow-50/5"
      >
        <div className="container-custom">
          <h2 className="text-4xl font-serif text-gold mb-6">Need More Assistance?</h2>
          <p className="text-xl text-ivory/80 max-w-2xl mx-auto mb-10">
            If you have specific questions about your bowl or need further guidance, our experts are here to help.
          </p>
          <a
            href="/contact"
            className="bg-gradient-to-r from-gold to-yellow-400 text-navy px-10 py-4 rounded-full font-semibold hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Contact Our Experts
          </a>
        </div>
      </motion.div>
    </div>
  )
}

export default SoundBowlCareGuidePage
