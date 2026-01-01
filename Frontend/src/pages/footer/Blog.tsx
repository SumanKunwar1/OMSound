"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"
import { useParams } from "react-router-dom"
import SEOHelmet from "../../components/seo/SEOHelmet"
import { useSEOData } from "../../hooks/useSEOData"

interface BlogPost {
  _id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  featuredImage?: string
  author: string
  category: string
  tags: string[]
  status: 'draft' | 'published' | 'archived'
  seo?: {
    title?: string
    description?: string
    keywords?: string
  }
  createdAt: string
  updatedAt: string
}

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.a
      href={`/blogs/${post.slug}`}
      className="block bg-navy/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gold/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img
          src={post.featuredImage || "/placeholder.svg"}
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
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
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
  const { slug } = useParams<{ slug?: string }>()
  const { seoData } = useSEOData("blog") // Changed path to "blog" without slash
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/blogs?status=published`)
        const data = await response.json()
        if (data.success) {
          setBlogPosts(data.data)
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  // Update the default SEO to handle cases where seoData is null
  const defaultSEO = {
    title: "Blog - Insights & Wisdom | OMSound Nepal",
    description: "Explore articles on sound healing, meditation, Himalayan culture, and the art of singing bowls.",
    keywords: ["sound healing blog", "meditation articles", "singing bowls insights", "himalayan culture"],
    ogImage: "/images/blog-hero.jpg",
    isActive: true
  }

  const currentSEO = seoData || defaultSEO

  // If slug exists, show single post view
  if (slug) {
    const [post, setPost] = useState<BlogPost | null>(null)
    const [postLoading, setPostLoading] = useState(true)

    useEffect(() => {
      const fetchPost = async () => {
        setPostLoading(true)
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/blogs/${slug}`)
          const data = await response.json()
          if (data.success) {
            setPost(data.data)
          }
        } catch (error) {
          console.error('Error fetching blog post:', error)
        } finally {
          setPostLoading(false)
        }
      }

      fetchPost()
    }, [slug])

    if (postLoading) {
      return <div className="min-h-screen bg-gradient-to-br from-navy via-indigo-900 to-purple-900 text-ivory pt-24">Loading...</div>
    }

    if (!post) {
      return <div className="min-h-screen bg-gradient-to-br from-navy via-indigo-900 to-purple-900 text-ivory pt-24">Post not found</div>
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-navy via-indigo-900 to-purple-900 text-ivory pt-24">
        <SEOHelmet
          title={post.title}
          description={post.excerpt || ''}
          keywords={[post.category, ...currentSEO.keywords]}
          image={post.featuredImage || currentSEO.ogImage}
        />

        <div className="container-custom py-16">
          <article className="max-w-4xl mx-auto">
            <div className="mb-12">
              <span className="bg-gold text-navy px-4 py-1 rounded-full text-sm font-semibold inline-block mb-4">
                {post.category}
              </span>
              <h1 className="text-4xl font-serif text-gold mb-4">{post.title}</h1>
              <div className="flex items-center gap-2 text-ivory/60 mb-8">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
              {post.featuredImage && (
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-96 object-cover rounded-xl mb-8"
                />
              )}
            </div>
            
            <div 
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </div>
    )
  }

  // Default blog list view
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
        {isLoading ? (
          <div className="text-center text-ivory">Loading blog posts...</div>
        ) : (
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
                key={post._id}
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
          <h2 className="text-4xl font-serif text-gold mb-6">Join Our Community</h2>
          <p className="text-xl text-ivory/80 max-w-2xl mx-auto mb-10">
            Subscribe to our newsletter for the latest articles, exclusive offers, and sound healing tips.
          </p>
          <a
            href="/newsletter-signup"
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