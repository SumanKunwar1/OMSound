"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, Mail, Phone, Star, Users, Award, Heart, Music, Sparkles, ChevronDown, Play, Pause } from "lucide-react"

const AboutPage = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [, setActiveSection] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
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
    { icon: Users, number: "500+", label: "Happy Customers", color: "text-blue-600" },
    { icon: Award, number: "15+", label: "Years Experience", color: "text-green-600" },
    { icon: Music, number: "1000+", label: "Bowls Crafted", color: "text-purple-600" },
    { icon: Heart, number: "99%", label: "Satisfaction Rate", color: "text-red-600" },
  ]

  const teamMembers = [
    {
      name: "Rajesh Shakya",
      role: "Master Craftsman",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Third-generation artisan with 25+ years of experience in traditional bowl making.",
      specialty: "Hand-hammering techniques",
    },
    {
      name: "Sita Maharjan",
      role: "Sound Therapist",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Certified sound healer who ensures each bowl meets therapeutic standards.",
      specialty: "Frequency tuning",
    },
    {
      name: "Kumar Tamang",
      role: "Quality Master",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Oversees quality control and maintains our high craftsmanship standards.",
      specialty: "Quality assurance",
    },
  ]

  const milestones = [
    { year: "2008", title: "Founded", description: "Started as a small family workshop in Kathmandu" },
    { year: "2012", title: "First Export", description: "Began shipping internationally to wellness centers" },
    { year: "2016", title: "Artisan Collective", description: "Expanded to work with 20+ master craftsmen" },
    { year: "2020", title: "Digital Presence", description: "Launched online platform during pandemic" },
    { year: "2024", title: "Global Recognition", description: "Featured in international wellness magazines" },
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
            alt="Himalayan workshop"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </video>

        <div className="relative z-20 text-center text-ivory max-w-4xl px-4">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-serif mb-6 bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent animate-pulse">
              OMSound Nepal
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">Where Ancient Wisdom Meets Modern Healing</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 bg-gold text-navy px-8 py-4 rounded-full hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isPlaying ? "Pause" : "Play"} Bowl Sound
              </button>
              <a
                href="/sound-healing"
                className="border-2 border-gold text-gold px-8 py-4 rounded-full hover:bg-gold hover:text-navy transition-all duration-300 transform hover:scale-105"
              >
                Learn Sound Healing
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gold" />
        </div>
      </div>

      {/* Stats Section */}
      <div
        ref={(el) => {
          if (el) sectionsRef.current[0] = el
        }}
        className="py-20 bg-white relative overflow-hidden"
      >
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group cursor-pointer"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-gold/20 to-yellow-200/20 mb-4 group-hover:scale-110 transition-transform duration-300 ${stat.color}`}
                >
                  <stat.icon className="w-8 h-8" />
                </div>
                <div
                  className={`text-4xl font-bold mb-2 transition-all duration-300 ${hoveredCard === index ? "text-gold scale-110" : "text-navy"}`}
                >
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div
        ref={(el) => {
          if (el) sectionsRef.current[1] = el
        }}
        className="py-20 bg-gradient-to-br from-gold/5 to-yellow-50 relative overflow-hidden"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-navy mb-6">Our Purpose</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Guided by ancient wisdom and modern innovation, we're committed to bringing authentic healing to the
              world.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-l-4 border-gold">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-gold to-yellow-400 rounded-full flex items-center justify-center mr-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-serif text-navy">Our Mission</h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  To preserve and share the ancient art of Himalayan singing bowl craftsmanship while empowering
                  individuals worldwide to discover inner peace, healing, and spiritual growth through authentic sound
                  therapy.
                </p>
                <div className="space-y-3">
                  {[
                    "Preserve traditional craftsmanship techniques",
                    "Support local artisan communities",
                    "Provide authentic therapeutic instruments",
                    "Educate about sound healing benefits",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gold rounded-full"></div>
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-l-4 border-blue-500">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-serif text-navy">Our Vision</h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  To become the world's most trusted source of authentic Himalayan singing bowls, creating a global
                  community where ancient healing wisdom transforms modern lives and connects souls across cultures.
                </p>
                <div className="space-y-3">
                  {[
                    "Global accessibility to authentic healing tools",
                    "Bridge ancient wisdom with modern wellness",
                    "Foster international healing community",
                    "Sustainable cultural preservation",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-navy to-blue-800 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-yellow-300/10"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-serif mb-4">Ready to Begin Your Healing Journey?</h3>
                <p className="text-lg mb-6 opacity-90">
                  Explore our collection of authentic singing bowls and discover the transformative power of sound
                  healing.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/shop"
                    className="bg-gold text-navy px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105"
                  >
                    Shop Singing Bowls
                  </a>
                  <a
                    href="/contact"
                    className="border-2 border-gold text-gold px-8 py-3 rounded-full hover:bg-gold hover:text-navy transition-all duration-300 transform hover:scale-105"
                  >
                    Get Expert Guidance
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div
        ref={(el) => {
          if (el) sectionsRef.current[2] = el
        }}
        className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 relative"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl font-serif text-navy mb-8 relative">
                Our Sacred Journey
                <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-gold to-yellow-400"></div>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                In the mystical valleys of Nepal, where the Himalayas touch the sky, OMSound Nepal was born from a dream
                to preserve ancient healing traditions while bringing their transformative power to the modern world.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our journey began in 2008 when second-generation Nepali bowl maker Ruchika Baidya decided to share her family's age-old singing bowl-making secrets with the world. What started as a small workshop has grown into a global movement of healing and harmony.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                {["Authentic", "Handcrafted", "Therapeutic", "Sustainable"].map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gold/20 text-navy rounded-full text-sm font-medium hover:bg-gold hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src="https://res.cloudinary.com/dei0ymk1p/image/upload/v1752241709/a-photograph-of-an-elegant-bronze-singin__qn7sFHYTIqpdP7WnFkp4g_LYhkjWLnTeCqR80Yrl-J-w_vmpzbw.jpg?height=600&width=800"
                  alt="Artisan crafting singing bowl"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Master at Work</h3>
                  <p className="text-sm opacity-90">Hand-hammering a therapeutic singing bowl</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div
        ref={(el) => {
          if (el) sectionsRef.current[3] = el
        }}
        className="py-20 bg-white relative"
      >
        <div className="container-custom">
          <h2 className="text-5xl font-serif text-center text-navy mb-16">Our Milestones</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gold to-yellow-400"></div>
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`flex items-center mb-12 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-gold">
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

      {/* Team Section */}
      <div
        ref={(el) => {
          if (el) sectionsRef.current[4] = el
        }}
        className="py-20 bg-gradient-to-br from-purple-50 to-blue-50"
      >
        <div className="container-custom">
          <h2 className="text-5xl font-serif text-center text-navy mb-16">Meet Our Artisans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredCard(index + 10)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-navy mb-2">{member.name}</h3>
                    <div className="text-gold font-medium mb-3">{member.role}</div>
                    <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-gold" />
                      <span className="text-sm text-gray-500">{member.specialty}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Want to learn more about our sound healing practices?</p>
            <a
              href="/sound-healing"
              className="inline-flex items-center gap-2 text-gold hover:text-yellow-600 font-medium transition-colors duration-300"
            >
              Discover Sound Healing <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
            </a>
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

        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-ivory mb-6">Connect With Us</h2>
            <p className="text-xl text-ivory/80 max-w-2xl mx-auto">
              Ready to begin your sound healing journey? We're here to guide you every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: MapPin,
                title: "Visit Our Workshop",
                info: "Sanepa, Lalitpur, Nepal",
                detail: "Open Mon-Fri, 10am-6pm",
              },
              { icon: Mail, title: "Email Us", info: "info@omsound.com", detail: "Response within 24 hours" },
              { icon: Phone, title: "Call Us", info: "+977 1234 5678", detail: "Available 9am-5pm (GMT+5:45)" },
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
          <Music className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default AboutPage
