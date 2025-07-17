"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ChevronDown, HelpCircle, X } from "lucide-react"
import SEOHelmet from "../../components/seo/SEOHelmet"
import { useSEOData } from "../../hooks/useSEOData"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion"

const FAQPage = () => {
  const { seoData } = useSEOData("/faq")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredFaqs, setFilteredFaqs] = useState<typeof faqs>([])

  const faqs = [
    {
      question: "What is a Himalayan singing bowl?",
      answer:
        "A Himalayan singing bowl is a type of bell, specifically a standing bell, that vibrates and produces a rich, deep tone when played. They are used for meditation, relaxation, sound healing, and personal well-being. Our bowls are handcrafted by master artisans in Nepal.",
      category: "General",
    },
    {
      question: "How do I play a singing bowl?",
      answer:
        "Singing bowls can be played in two main ways: by striking them with a mallet to produce a bell-like tone, or by rubbing the mallet around the rim to create a continuous 'singing' sound. The technique involves gentle pressure and a steady motion.",
      category: "Usage",
    },
    {
      question: "What are the benefits of sound healing?",
      answer:
        "Sound healing with singing bowls can help reduce stress and anxiety, improve sleep, balance chakras, promote deep relaxation, alleviate pain, and enhance mental clarity and emotional well-being.",
      category: "Benefits",
    },
    {
      question: "How do I choose the right singing bowl for me?",
      answer:
        "Consider the size, tone, and material. Smaller bowls have higher pitches, while larger bowls produce deeper tones. Different metals and alloys affect the sound. For meditation, a bowl with a sustained, clear tone is often preferred. Our team can also provide personalized recommendations.",
      category: "Selection",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer free worldwide shipping on all orders over $100. For orders below this amount, shipping costs will be calculated at checkout.",
      category: "Shipping",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day satisfaction guarantee. If you are not completely happy with your purchase, you can return it within 30 days for a full refund or exchange, provided it is in its original condition.",
      category: "Orders",
    },
    {
      question: "Are your bowls authentic?",
      answer:
        "Absolutely. All our Himalayan singing bowls are authentic, handcrafted by skilled artisans in Nepal using traditional methods and high-quality metals. We ensure fair trade practices and support local communities.",
      category: "General",
    },
    {
      question: "Can I use singing bowls for chakra balancing?",
      answer:
        "Yes, singing bowls are widely used for chakra balancing. Each bowl's unique frequency can resonate with specific energy centers (chakras) in the body, helping to clear blockages and restore harmony.",
      category: "Benefits",
    },
  ]

  useEffect(() => {
    setFilteredFaqs(
      faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.category.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    )
  }, [searchQuery, faqs])

  const defaultSEO = {
    title: "FAQ - Frequently Asked Questions | OMSound Nepal",
    description: "Find answers to common questions about Himalayan singing bowls, sound healing, orders, and more.",
    keywords: ["FAQ", "singing bowls questions", "sound healing FAQ", "OMSound Nepal support"],
    ogImage: "/images/faq-hero.jpg",
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
        url="https://omsoundnepal.com/faq"
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
            Frequently Asked Questions
          </h1>
          <p className="text-xl md:text-2xl text-ivory/80 max-w-3xl mx-auto mb-10">
            Your journey to inner peace starts with clarity. Find answers to common questions about our sacred bowls and
            sound healing.
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
              placeholder="Search for answers..."
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

      {/* FAQ Content */}
      <div className="container-custom py-16">
        {filteredFaqs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
            <AnimatePresence>
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="mb-4 rounded-lg overflow-hidden border border-gold/20 bg-navy/50 backdrop-blur-sm"
                >
                  <AccordionItem value={`item-${index}`} className="border-b border-gold/10 last:border-b-0">
                    <AccordionTrigger className="flex justify-between items-center p-6 text-left text-xl font-semibold text-gold hover:text-yellow-300 transition-colors">
                      {faq.question}
                      <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-lg text-ivory/80 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </AnimatePresence>
          </Accordion>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
            <HelpCircle className="w-16 h-16 text-gold mx-auto mb-6" />
            <h3 className="text-3xl font-serif text-gold mb-4">No results found</h3>
            <p className="text-ivory/70 max-w-md mx-auto mb-10">
              We couldn't find any FAQs matching your search. Please try a different query or contact our support team.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-8 bg-gradient-to-r from-gold to-yellow-400 text-navy px-8 py-3 rounded-full font-semibold hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105"
            >
              Clear Search
            </button>
          </motion.div>
        )}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="py-20 text-center bg-gradient-to-r from-gold/5 to-yellow-50/5"
      >
        <div className="container-custom">
          <h2 className="text-4xl font-serif text-gold mb-6">Still Have Questions?</h2>
          <p className="text-xl text-ivory/80 max-w-2xl mx-auto mb-10">
            Our dedicated support team is here to help you. Reach out to us for personalized assistance.
          </p>
          <a
            href="/contact"
            className="bg-gradient-to-r from-gold to-yellow-400 text-navy px-10 py-4 rounded-full font-semibold hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Contact Support
          </a>
        </div>
      </motion.div>
    </div>
  )
}

export default FAQPage
