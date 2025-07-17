"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"
import SEOHelmet from "../../components/seo/SEOHelmet"
import { useSEOData } from "../../hooks/useSEOData"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  image: string
  slug: string
}

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.a
      href={`/blog/${post.slug}`}
      className="block bg-navy/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gold/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute bottom-4 left-4 bg-gold text-navy px-4 py-1 rounded-full text-sm font-semibold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
        >
          {post.category}
        </motion.div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gold mb-3 group-hover:text-yellow-300 transition-colors">
          {post.title}
        </h3>
        <p className="text-ivory/80 text-base leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between text-ivory/60 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{post.date}</span>
          </div>
          <motion.div
            className="flex items-center gap-2 text-gold group-hover:text-yellow-300"
            initial={{ x: 0 }}
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            Read More <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </motion.a>
  )
}

const BlogPage = () => {
  const { seoData } = useSEOData("/blog")

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "The Ancient Art of Himalayan Singing Bowls",
      excerpt:
        "Dive deep into the history and spiritual significance of singing bowls, tracing their origins back to ancient Nepal and Tibet. Discover how these sacred instruments have been used for centuries in meditation and healing practices.",
      date: "July 15, 2024",
      category: "History",
      image:
        "https://res.cloudinary.com/dei0ymk1p/image/upload/v1752241709/a-photograph-of-an-elegant-bronze-singin__qn7sFHYTIqpdP7WnFkp4g_LYhkjWLnTeCqR80Yrl-J-w_vmpzbw.jpg?height=400&width=600",
      slug: "ancient-art-himalayan-singing-bowls",
    },
    {
      id: "2",
      title: "5 Ways Sound Healing Can Transform Your Life",
      excerpt:
        "Explore the profound benefits of sound healing therapy, from stress reduction and improved sleep to emotional release and enhanced spiritual connection. Learn practical tips to integrate sound healing into your daily routine.",
      date: "July 10, 2024",
      category: "Wellness",
      image: "/placeholder.svg?height=400&width=600",
      slug: "5-ways-sound-healing-transform-life",
    },
    {
      id: "3",
      title: "Choosing Your First Singing Bowl: A Beginner's Guide",
      excerpt:
        "Overwhelmed by choices? This guide simplifies the process of selecting your first singing bowl. We cover factors like size, tone, material, and how to test a bowl to find your perfect match.",
      date: "July 01, 2024",
      category: "Guide",
      image: "/placeholder.svg?height=400&width=600",
      slug: "choosing-first-singing-bowl",
    },
    {
      id: "4",
      title: "The Science Behind Sound Frequencies and Healing",
      excerpt:
        "Delve into the scientific principles that explain how sound frequencies interact with the human body and mind. Understand the concept of resonance and how it contributes to therapeutic effects.",
      date: "June 25, 2024",
      category: "Science",
      image: "/placeholder.svg?height=400&width=600",
      slug: "science-behind-sound-frequencies",
    },
    {
      id: "5",
      title: "Meet the Artisans: Crafting Bowls in Kathmandu",
      excerpt:
        "Take a virtual journey to the workshops of Kathmandu and meet the master artisans who dedicate their lives to creating these sacred instruments. Learn about their traditional techniques and the passion behind each bowl.",
      date: "June 18, 2024",
      category: "Culture",
      image: "/placeholder.svg?height=400&width=600",
      slug: "meet-the-artisans-kathmandu",
    },
    {
      id: "6",
      title: "Integrating Singing Bowls into Your Meditation Practice",
      excerpt:
        "Discover practical ways to incorporate singing bowls into your daily meditation. From setting intentions to using specific tones for chakra work, enhance your spiritual journey.",
      date: "June 10, 2024",
      category: "Meditation",
      image: "/placeholder.svg?height=400&width=600",
      slug: "integrating-singing-bowls-meditation",
    },
  ]

  const defaultSEO = {
    title: "Blog - Insights & Wisdom | OMSound Nepal",
    description: "Explore articles on sound healing, meditation, Himalayan culture, and the art of singing bowls.",
    keywords: ["sound healing blog", "meditation articles", "singing bowls insights", "himalayan culture"],
    ogImage: "/images/blog-hero.jpg",
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
        url="https://omsoundnepal.com/blog"
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
            Insights & Wisdom
          </h1>
          <p className="text-xl md:text-2xl text-ivory/80 max-w-3xl mx-auto">
            Explore our blog for articles on sound healing, meditation, Himalayan culture, and the art of singing bowls.
          </p>
        </div>
      </motion.div>

      {/* Blog Posts Grid */}
      <div className="container-custom py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <BlogPostCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="py-20 text-center bg-gradient-to-r from-gold/5 to-yellow-50/5"
      >
        <div className="container-custom">
          <h2 className="text-4xl font-serif text-gold mb-6">Join Our Community</h2>
          <p className="text-xl text-ivory/80 max-w-2xl mx-auto mb-10">
            Subscribe to our newsletter for the latest articles, exclusive offers, and sound healing tips.
          </p>
          <a
            href="/newsletter-signup" // Placeholder link
            className="bg-gradient-to-r from-gold to-yellow-400 text-navy px-10 py-4 rounded-full font-semibold hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Subscribe Now
          </a>
        </div>
      </motion.div>
    </div>
  )
}

export default BlogPage
