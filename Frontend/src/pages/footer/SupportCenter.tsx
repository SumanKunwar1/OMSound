"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MessageSquare, Phone, Mail, BookOpen, Lightbulb, X, ChevronRight, Truck, Package } from "lucide-react"
import SEOHelmet from "../../components/seo/SEOHelmet"
import { useSEOData } from "../../hooks/useSEOData"

const SupportCenterPage = () => {
  const { seoData } = useSEOData("/support-center")
  const [searchQuery, setSearchQuery] = useState("")

  const popularTopics = [
    {
      title: "Order Tracking & Status",
      description: "Find out where your order is and its current delivery status.",
      icon: Truck,
      link: "/shipping-policy#tracking-orders",
    },
    {
      title: "Returns & Refunds",
      description: "Information on how to return a product and our refund policy.",
      icon: Package,
      link: "/returns-policy", // Placeholder link
    },
    {
      title: "Product Care & Maintenance",
      description: "Guides on how to care for your singing bowls and accessories.",
      icon: BookOpen,
      link: "/care-guide",
    },
    {
      title: "Sound Healing Benefits",
      description: "Learn more about the therapeutic advantages of sound healing.",
      icon: Lightbulb,
      link: "/sound-healing",
    },
  ]

  const contactOptions = [
    {
      title: "Live Chat",
      description: "Get instant support from our team.",
      icon: MessageSquare,
      action: () => alert("Live Chat coming soon!"), // Placeholder for live chat
      color: "from-gold to-yellow-400",
    },
    {
      title: "Email Support",
      description: "Send us an email and we'll get back to you within 24 hours.",
      icon: Mail,
      action: () => (window.location.href = "mailto:support@omsoundnepal.com"),
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Call Us",
      description: "Speak directly with a support representative.",
      icon: Phone,
      action: () => alert("Call us at +977 1234 5678"), // Placeholder for phone call
      color: "from-purple-500 to-pink-500",
    },
  ]

  const defaultSEO = {
    title: "Support Center - How Can We Help? | OMSound Nepal",
    description: "Find answers to your questions and get support for your OMSound Nepal products and services.",
    keywords: ["support", "help center", "customer service", "troubleshooting"],
    ogImage: "/images/support-hero.jpg",
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
        url="https://omsoundnepal.com/support-center"
      />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-yellow-300/10 animate-pulse" />
        <div className="container-custom relative z-10">
          <h1 className="text-6xl md:text-8xl font-serif mb-6 bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent">
            Support Center
          </h1>
          <p className="text-xl md:text-2xl text-ivory/80 max-w-3xl mx-auto mb-10">
            How can we help you today? Find answers, guides, and contact options.
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="relative max-w-xl mx-auto"
          >
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gold/60 w-6 h-6" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white/10 border border-gold/30 rounded-full text-ivory placeholder-ivory/50 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-300 text-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-ivory/60 hover:text-gold transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Popular Topics Section */}
      <div className="container-custom py-16">
        <h2 className="text-5xl font-serif text-center text-gold mb-16">Popular Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {popularTopics.map((topic, index) => (
            <motion.a
              key={index}
              href={topic.link}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="block bg-navy/50 backdrop-blur-sm rounded-2xl p-8 border border-gold/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center group"
            >
              <div className="flex items-center justify-center w-20 h-20 bg-gold/20 text-gold rounded-full mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <topic.icon className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-semibold text-gold mb-3 group-hover:text-yellow-300 transition-colors">
                {topic.title}
              </h3>
              <p className="text-ivory/80 leading-relaxed mb-4">{topic.description}</p>
              <div className="flex items-center justify-center gap-2 text-gold group-hover:text-yellow-300 transition-colors">
                Learn More <ChevronRight className="w-5 h-5" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Contact Options Section */}
      <div className="container-custom py-16">
        <h2 className="text-5xl font-serif text-center text-gold mb-16">Need to Speak With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {contactOptions.map((option, index) => (
            <motion.button
              key={index}
              onClick={option.action}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col items-center justify-center bg-gradient-to-r ${option.color} text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]`}
            >
              <div className="flex items-center justify-center w-20 h-20 bg-white/20 text-white rounded-full mb-6">
                <option.icon className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">{option.title}</h3>
              <p className="text-white/80 text-center leading-relaxed">{option.description}</p>
            </motion.button>
          ))}
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
          <h2 className="text-4xl font-serif text-gold mb-6">Can't Find What You're Looking For?</h2>
          <p className="text-xl text-ivory/80 max-w-2xl mx-auto mb-10">
            Our comprehensive FAQ section might have the answer you need.
          </p>
          <a
            href="/faq"
            className="bg-gradient-to-r from-gold to-yellow-400 text-navy px-10 py-4 rounded-full font-semibold hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Visit FAQ Page
          </a>
        </div>
      </motion.div>
    </div>
  )
}

export default SupportCenterPage
