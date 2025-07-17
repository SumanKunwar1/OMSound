"use client"

import { motion } from "framer-motion"
import { Briefcase, Users, Heart, Sparkles, ChevronRight } from "lucide-react"
import SEOHelmet from "../../components/seo/SEOHelmet"
import { useSEOData } from "../../hooks/useSEOData"

const CareersPage = () => {
  const { seoData } = useSEOData("/careers")

  const values = [
    {
      icon: Heart,
      title: "Passion for Healing",
      description: "We believe in the transformative power of sound and are dedicated to sharing it globally.",
    },
    {
      icon: Users,
      title: "Community & Collaboration",
      description: "A supportive environment where diverse talents come together to create harmony.",
    },
    {
      icon: Sparkles,
      title: "Authenticity & Craftsmanship",
      description: "Upholding traditional methods and ensuring the highest quality in every bowl.",
    },
    {
      icon: Briefcase,
      title: "Growth & Learning",
      description: "Opportunities for personal and professional development in a dynamic industry.",
    },
  ]

  const jobOpenings = [
    {
      id: "1",
      title: "Digital Marketing Specialist",
      location: "Remote / Kathmandu",
      type: "Full-time",
      description: "Develop and execute digital marketing campaigns to expand our global reach.",
      requirements: ["3+ years experience", "SEO/SEM expertise", "Social media management"],
      slug: "digital-marketing-specialist",
    },
    {
      id: "2",
      title: "Sound Healing Practitioner",
      location: "Kathmandu, Nepal",
      type: "Full-time",
      description: "Conduct sound healing sessions and workshops, sharing ancient wisdom.",
      requirements: ["Certified sound healer", "Experience with Himalayan bowls", "Strong communication skills"],
      slug: "sound-healing-practitioner",
    },
    {
      id: "3",
      title: "E-commerce Manager",
      location: "Remote",
      type: "Full-time",
      description: "Oversee our online store operations, sales, and customer experience.",
      requirements: ["5+ years e-commerce experience", "Shopify expertise", "Analytics proficiency"],
      slug: "e-commerce-manager",
    },
    {
      id: "4",
      title: "Artisan Apprentice",
      location: "Kathmandu, Nepal",
      type: "Apprenticeship",
      description: "Learn the traditional art of singing bowl craftsmanship from master artisans.",
      requirements: ["Strong work ethic", "Interest in traditional crafts", "Manual dexterity"],
      slug: "artisan-apprentice",
    },
  ]

  const defaultSEO = {
    title: "Careers - Join Our Team | OMSound Nepal",
    description: "Explore career opportunities at OMSound Nepal and become part of our mission to spread healing.",
    keywords: ["careers", "jobs", "hiring", "OMSound Nepal jobs", "sound healing careers"],
    ogImage: "/images/careers-hero.jpg",
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
        url="https://omsoundnepal.com/careers"
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
            Join Our Sacred Journey
          </h1>
          <p className="text-xl md:text-2xl text-ivory/80 max-w-3xl mx-auto">
            Become a part of the OMSound Nepal family and help us spread harmony and healing worldwide.
          </p>
        </div>
      </motion.div>

      {/* Why Join Us Section */}
      <div className="container-custom py-16">
        <h2 className="text-5xl font-serif text-center text-gold mb-16">Why Work With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-navy/50 backdrop-blur-sm rounded-2xl p-8 border border-gold/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center"
            >
              <div className="flex items-center justify-center w-20 h-20 bg-gold/20 text-gold rounded-full mb-6 mx-auto">
                <value.icon className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-semibold text-gold mb-3">{value.title}</h3>
              <p className="text-ivory/80 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Open Positions Section */}
      <div className="container-custom py-16">
        <h2 className="text-5xl font-serif text-center text-gold mb-16">Current Openings</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {jobOpenings.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-navy/50 backdrop-blur-sm rounded-2xl p-8 border border-gold/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.01]"
            >
              <h3 className="text-3xl font-semibold text-gold mb-3">{job.title}</h3>
              <div className="flex items-center gap-4 text-ivory/70 text-sm mb-4">
                <span>{job.location}</span>
                <span className="px-3 py-1 bg-gold/20 text-gold rounded-full">{job.type}</span>
              </div>
              <p className="text-ivory/80 leading-relaxed mb-6">{job.description}</p>
              <h4 className="text-xl font-semibold text-gold mb-3">Requirements:</h4>
              <ul className="list-disc list-inside text-ivory/80 space-y-2 mb-6">
                {job.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
              <a
                href={`/apply/${job.slug}`} // Placeholder for application link
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gold to-yellow-400 text-navy px-8 py-3 rounded-full font-semibold hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105"
              >
                Apply Now <ChevronRight className="w-5 h-5" />
              </a>
            </motion.div>
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
          <h2 className="text-4xl font-serif text-gold mb-6">Don't See Your Role?</h2>
          <p className="text-xl text-ivory/80 max-w-2xl mx-auto mb-10">
            We're always looking for passionate individuals. Send us your resume and tell us how you can contribute.
          </p>
          <a
            href="/contact"
            className="bg-gradient-to-r from-gold to-yellow-400 text-navy px-10 py-4 rounded-full font-semibold hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Submit Your Resume
          </a>
        </div>
      </motion.div>
    </div>
  )
}

export default CareersPage
