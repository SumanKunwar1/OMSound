"use client"

import { motion } from "framer-motion"
import { Newspaper, Mic, Download, Mail, Link, ChevronRight } from "lucide-react"
import SEOHelmet from "../../components/seo/SEOHelmet"
import { useSEOData } from "../../hooks/useSEOData"

const PressMediaPage = () => {
  const { seoData } = useSEOData("/press-media")

  const pressReleases = [
    {
      id: "1",
      title: "OMSound Nepal Launches New Collection of Therapeutic Singing Bowls",
      date: "July 20, 2024",
      excerpt:
        "Kathmandu, Nepal – OMSound Nepal, a leading provider of authentic Himalayan singing bowls, today announced the launch of its new 'Resonance Collection,' featuring meticulously handcrafted bowls designed for enhanced therapeutic sound healing.",
      link: "#", // Placeholder link
    },
    {
      id: "2",
      title: "OMSound Nepal Partners with Global Wellness Retreats for Sound Immersion Programs",
      date: "June 15, 2024",
      excerpt:
        "OMSound Nepal is proud to announce its collaboration with several international wellness centers to offer immersive sound healing retreats, bringing ancient Nepali traditions to a global audience.",
      link: "#", // Placeholder link
    },
    {
      id: "3",
      title: "Master Artisan Ruchika Baidya Shares Insights on Traditional Bowl Craftsmanship",
      date: "May 10, 2024",
      excerpt:
        "In a recent interview, Ruchika Baidya, a second-generation master artisan at OMSound Nepal, discussed the intricate process and spiritual dedication involved in crafting authentic Himalayan singing bowls.",
      link: "#", // Placeholder link
    },
  ]

  const mediaMentions = [
    {
      id: "1",
      source: "Wellness Today Magazine",
      title: "The Healing Power of Himalayan Singing Bowls",
      date: "July 5, 2024",
      link: "https://example.com/wellness-today", // Placeholder external link
    },
    {
      id: "2",
      source: "Mindful Living Blog",
      title: "OMSound Nepal: Bridging Ancient Traditions with Modern Wellness",
      date: "June 28, 2024",
      link: "https://example.com/mindful-living", // Placeholder external link
    },
    {
      id: "3",
      source: "Travel Nepal Daily",
      title: "Discovering Kathmandu's Hidden Gems: The Artisans of Sound",
      date: "May 20, 2024",
      link: "https://example.com/travel-nepal", // Placeholder external link
    },
  ]

  const defaultSEO = {
    title: "Press & Media - OMSound Nepal",
    description: "Access press releases, media mentions, and brand assets for OMSound Nepal.",
    keywords: ["press", "media", "press kit", "OMSound Nepal news", "media contact"],
    ogImage: "/images/press-hero.jpg",
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
        url="https://omsoundnepal.com/press-media"
      />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-pulse" />
        <div className="container-custom relative z-10">
          <h1 className="text-6xl md:text-8xl font-serif mb-6 bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent">
            Press & Media
          </h1>
          <p className="text-xl md:text-2xl text-ivory/80 max-w-3xl mx-auto">
            Your source for OMSound Nepal news, press releases, and media resources.
          </p>
        </div>
      </motion.div>

      {/* Press Releases Section */}
      <div className="container-custom py-16">
        <h2 className="text-5xl font-serif text-center text-gold mb-16">Latest Press Releases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {pressReleases.map((release, index) => (
            <motion.div
              key={release.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-navy/50 backdrop-blur-sm rounded-2xl p-8 border border-gold/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.01]"
            >
              <h3 className="text-3xl font-semibold text-gold mb-3">{release.title}</h3>
              <p className="text-ivory/70 text-sm mb-4 flex items-center gap-2">
                <Newspaper className="w-4 h-4" /> {release.date}
              </p>
              <p className="text-ivory/80 leading-relaxed mb-6 line-clamp-4">{release.excerpt}</p>
              <a
                href={release.link}
                className="inline-flex items-center gap-2 text-gold hover:text-yellow-300 transition-colors font-semibold"
              >
                Read Full Release <ChevronRight className="w-5 h-5" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Media Mentions Section */}
      <div className="container-custom py-16">
        <h2 className="text-5xl font-serif text-center text-gold mb-16">In The Media</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {mediaMentions.map((mention, index) => (
            <motion.a
              key={mention.id}
              href={mention.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="block bg-navy/50 backdrop-blur-sm rounded-2xl p-8 border border-gold/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <Mic className="w-8 h-8 text-gold" />
                <div>
                  <h3 className="text-xl font-semibold text-gold group-hover:text-yellow-300 transition-colors">
                    {mention.source}
                  </h3>
                  <p className="text-ivory/70 text-sm">{mention.date}</p>
                </div>
              </div>
              <p className="text-ivory/80 leading-relaxed mb-4">{mention.title}</p>
              <div className="flex items-center gap-2 text-gold group-hover:text-yellow-300 transition-colors">
                Visit Article <Link className="w-4 h-4" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Press Kit Section */}
      <div className="container-custom py-16 text-center">
        <h2 className="text-5xl font-serif text-gold mb-16">Press Kit & Resources</h2>
        <p className="text-xl text-ivory/80 max-w-3xl mx-auto mb-10">
          Download our official press kit, including high-resolution images, logos, and company information.
        </p>
        <motion.a
          href="/press-kit.zip" // Placeholder download link
          download
          className="inline-flex items-center gap-3 bg-gradient-to-r from-gold to-yellow-400 text-navy px-10 py-4 rounded-full font-semibold hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Download className="w-6 h-6" />
          Download Press Kit
        </motion.a>
      </div>

      {/* Media Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="py-20 text-center bg-gradient-to-r from-gold/5 to-yellow-50/5"
      >
        <div className="container-custom">
          <h2 className="text-4xl font-serif text-gold mb-6">Media Inquiries</h2>
          <p className="text-xl text-ivory/80 max-w-2xl mx-auto mb-10">
            For all press and media-related inquiries, please contact us directly.
          </p>
          <a
            href="mailto:media@omsoundnepal.com"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-gold to-yellow-400 text-navy px-10 py-4 rounded-full font-semibold hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Mail className="w-6 h-6" />
            Contact Media Relations
          </a>
        </div>
      </motion.div>
    </div>
  )
}

export default PressMediaPage
