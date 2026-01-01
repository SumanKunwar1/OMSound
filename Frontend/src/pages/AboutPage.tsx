"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, Mail, Phone, Star, Users, Award, Shield, Droplets, Sparkles, ChevronDown, Play, Pause } from "lucide-react"

const AboutPage = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [, setActiveSection] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [] = useState<number | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionsRef.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) setActiveSection(index)
          }
        })
      },
      { threshold: 0.3 },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const stats = [
    { icon: Users, number: "500+", label: "Protected Properties", color: "text-blue-600" },
    { icon: Award, number: "20+", label: "Years Experience", color: "text-green-600" },
    { icon: Shield, number: "10000+", label: "Projects Completed", color: "text-purple-600" },
    { icon: Star, number: "99%", label: "Client Satisfaction", color: "text-red-600" },
  ]

  

  const milestones = [
    { year: "2004", title: "Founded", description: "Started as a small waterproofing solutions provider in Kathmandu" },
    { year: "2010", title: "Expansion", description: "Expanded to commercial and industrial waterproofing projects" },
    { year: "2015", title: "Certification", description: "Achieved ISO certification and industry quality standards" },
    { year: "2020", title: "Product Line", description: "Launched comprehensive range of coatings and membranes" },
    { year: "2024", title: "Market Leader", description: "Recognized as leading waterproofing solutions provider in Nepal" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory via-white to-blue-50 overflow-hidden">
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 12}%`,
              transform: `translate(${mousePosition.x * 0.01 * (i + 1)}px, ${mousePosition.y * 0.01 * (i + 1)}px)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <Sparkles className="text-gold/20 w-4 h-4" />
          </div>
        ))}
      </div>

      {/* Hero Section with Video */}
      <div
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/60 to-transparent z-10" />

        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: `scale(${1 + scrollY * 0.0005})`,
          }}
        >
          <source src="/placeholder-video.mp4" type="video/mp4" />
          {/* Fallback image */}
          <img
            src="/placeholder.svg?height=1080&width=1920"
            alt="Waterproofing protection"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </video>

        <div className="relative z-20 text-center text-ivory max-w-4xl px-4">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-serif mb-6 bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent animate-pulse">
              Trinity Waterproofing
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">Protecting Your Properties, Preserving Your Peace of Mind</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 bg-gold text-navy px-8 py-4 rounded-full hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isPlaying ? "Pause" : "Play"} Our Story
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gold" />
        </div>
      </div>

      {/* Stats Section */}
      <div
        ref={(el) => {
          if (el) sectionsRef.current[0] = el
        }}
        className="py-20 bg-white border-b border-gold/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center transform hover:scale-110 transition-all duration-300 p-6 rounded-xl hover:bg-gold/5"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-full mb-4`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-4xl font-bold text-navy mb-2">{stat.number}</div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div
        ref={(el) => {
          if (el) sectionsRef.current[1] = el
        }}
        className="py-20 bg-gradient-to-br from-blue-50 to-purple-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-serif text-center text-navy mb-16">Our Mission & Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-serif text-navy mb-6">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Trinity Waterproofing is dedicated to protecting properties and providing peace of mind through innovative, 
                high-quality waterproofing solutions. We combine industry expertise with cutting-edge products to deliver 
                comprehensive protection against water damage.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Since 2004, we've been the trusted partner for residential, commercial, and industrial waterproofing needs 
                across Nepal, serving thousands of satisfied clients with unwavering commitment to excellence.
              </p>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Our mission"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute top-8 right-8 bg-gold text-navy px-6 py-4 rounded-full font-semibold shadow-lg">
                20+ Years Strong
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div
        ref={(el) => {
          if (el) sectionsRef.current[2] = el
        }}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-serif text-center text-navy mb-16">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality Excellence",
                description:
                  "We commit to the highest standards in materials, workmanship, and service delivery in every project we undertake.",
                icon: Award,
              },
              {
                title: "Client Trust",
                description:
                  "Your satisfaction is our priority. We build lasting relationships through transparency, reliability, and exceptional results.",
                icon: Shield,
              },
              {
                title: "Innovation",
                description:
                  "We continuously improve our products and processes, staying ahead of industry trends to provide cutting-edge solutions.",
                icon: Droplets,
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gold/5 to-transparent p-8 rounded-2xl border border-gold/20 hover:border-gold/50 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gold text-navy rounded-full mb-6">
                  <value.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-semibold text-navy mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div
        ref={(el) => {
          if (el) sectionsRef.current[3] = el
        }}
        className="py-20 bg-gradient-to-br from-purple-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-serif text-center text-navy mb-16">Our Journey</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gold via-gold to-transparent"></div>

            {/* Milestones */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-12" : "pl-12"}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="text-gold font-bold text-lg mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-navy mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gold rounded-full border-4 border-white shadow-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      
      {/* Interactive Contact Section */}
      <div
        ref={(el) => {
          if (el) sectionsRef.current[5] = el
        }}
        className="py-20 bg-navy relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gold rounded-full animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-24 h-24 bg-yellow-300 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/3 w-16 h-16 bg-gold rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-ivory mb-6">Connect With Trinity</h2>
            <p className="text-xl text-ivory/80 max-w-2xl mx-auto">
              Ready to protect your property? Contact us today for a free consultation and assessment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: MapPin,
                title: "Visit Our Office",
                info: "Kathmandu, Nepal",
                detail: "Open Mon-Fri, 9am-5pm",
              },
              { icon: Mail, title: "Email Us", info: "info@trinitywaterproofing.com", detail: "Response within 24 hours" },
              { icon: Phone, title: "Call Us", info: "+977 985-1042257", detail: "Available 9am-5pm (GMT+5:45)" },
            ].map((contact, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-gold/20"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 text-gold rounded-full mb-6">
                  <contact.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-ivory mb-3">{contact.title}</h3>
                <p className="text-gold text-lg mb-2">{contact.info}</p>
                <p className="text-ivory/60 text-sm">{contact.detail}</p>
              </div>
            ))}
          </div>

          {/* Interactive Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-gold/20">
            <h3 className="text-2xl font-serif text-ivory mb-8 text-center">Send Us a Message</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-ivory/80 text-sm font-medium">Your Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 border border-gold/30 rounded-lg text-ivory placeholder-ivory/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-ivory/80 text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white/10 border border-gold/30 rounded-lg text-ivory placeholder-ivory/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="block text-ivory/80 text-sm font-medium">Subject</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 border border-gold/30 rounded-lg text-ivory placeholder-ivory/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
                  placeholder="What is your message about?"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="block text-ivory/80 text-sm font-medium">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-gold/30 rounded-lg text-ivory placeholder-ivory/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Share your thoughts or questions..."
                ></textarea>
              </div>
              <div className="md:col-span-2 text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-gold to-yellow-400 text-navy px-12 py-4 rounded-full font-semibold hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-gradient-to-r from-gold to-yellow-400 text-navy p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-pulse">
          <Shield className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default AboutPage