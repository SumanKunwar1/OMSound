"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Instagram,
  Facebook,
  Globe,
  Users,
  Award,
  ChevronDown,
  Star,
  CheckCircle,
  ArrowRight,
  Share2,
  MessageCircle,
  Sparkles,
} from "lucide-react"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [activeInput, setActiveInput] = useState<string | null>(null)
  const [formProgress, setFormProgress] = useState(0)
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
    const filledFields = Object.values(formData).filter((value) => value.trim() !== "").length
    setFormProgress((filledFields / 5) * 100)
  }, [formData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate form submission or connect to your API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Reset form
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        subject: "",
        message: "",
      })
      setFormProgress(0)

      // Show success message
      alert("Thank you for your message! We will get back to you within 24 hours.")
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Failed to submit form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Office",
      details: ["Trinity Waterproofing", "Kathmandu, Nepal", "Central Nepal Region"],
      extra: "Open Monday-Friday, 9am-5pm NPT",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+977 985-1042257"],
      extra: "Available 9am-5pm (GMT+5:45)",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-500/20 to-emerald-500/20",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@trinitywaterproofing.com"],
      extra: "We typically respond within 24 hours",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-500/20 to-pink-500/20",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 9am-5pm", "Sat: 10am-2pm", "Sun: Closed"],
      extra: "Nepal Standard Time (GMT+5:45)",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-500/20 to-red-500/20",
    },
  ]

  const subjects = [
    "General Inquiry",
    "Free Inspection Request",
    "Service Quote",
    "Bathroom Waterproofing",
    "Terrace Protection",
    "Basement Solutions",
    "Anti-Termite Treatment",
    "Emergency Repair",
  ]

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://facebook.com/trinitywaterproofing",
      label: "Facebook",
      color: "from-blue-600 to-blue-700",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/trinitywaterproofing",
      label: "Instagram",
      color: "from-pink-500 to-purple-500",
    },
    {
      icon: Globe,
      href: "https://trinitywaterproofing.com",
      label: "Website",
      color: "from-blue-400 to-cyan-500",
    },
    {
      icon: Share2,
      href: "https://linkedin.com/company/trinity-waterproofing",
      label: "LinkedIn",
      color: "from-blue-500 to-blue-600",
    },
  ]

  const quickHelp = [
    { title: "Get Free Inspection", href: "/inspection", icon: CheckCircle },
    { title: "View Our Services", href: "/services", icon: Globe },
    { title: "Project Gallery", href: "/portfolio", icon: Award },
  ]

  const stats = [
    { number: "500+", label: "Properties Protected", icon: Users },
    { number: "24hrs", label: "Response Time", icon: Clock },
    { number: "20+", label: "Years Experience", icon: Award },
    { number: "99%", label: "Satisfaction Rate", icon: Star },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-indigo-900 to-purple-900 overflow-hidden pt-16">
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${10 + i * 8}%`,
              top: `${10 + i * 7}%`,
              transform: `translate(${mousePosition.x * 0.01 * (i + 1)}px, ${mousePosition.y * 0.01 * (i + 1)}px)`,
              transition: "transform 0.1s ease-out",
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <Sparkles className="text-gold/20 w-3 h-3" />
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative min-h-96 flex items-center justify-center overflow-hidden"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/60 to-transparent z-10" />

        <div className="relative z-20 text-center text-ivory max-w-4xl px-4">
          <h1 className="text-6xl md:text-7xl font-serif mb-6 bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent animate-pulse">
            Get In Touch
          </h1>
          <p className="text-xl md:text-2xl mb-4 opacity-90">
            Contact Trinity Waterproofing Today
          </p>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Have questions about our waterproofing solutions? Need a free inspection? Our team is here to help protect your property.
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gold" />
        </div>
      </div>

      {/* Stats Section */}
      <div
        ref={(el) => {
          if (el) sectionsRef.current[0] = el
        }}
        className="py-16 bg-white/5 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`text-center p-6 rounded-2xl transition-all duration-300 ${
                  hoveredCard === index ? "bg-white/10 scale-105" : "bg-white/5"
                }`}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-gold/30 to-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-gold" />
                </div>
                <div className="text-4xl font-bold text-gold mb-2">{stat.number}</div>
                <p className="text-ivory/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Information & Form Section */}
      <div
        ref={(el) => {
          if (el) sectionsRef.current[1] = el
        }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-gold/20 hover:border-gold/40 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${info.color} flex items-center justify-center mb-4`}>
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-serif text-gold mb-3">{info.title}</h3>
                <div className="space-y-1 mb-4">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-ivory/80 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
                <p className="text-ivory/60 text-xs">{info.extra}</p>
              </div>
            ))}
          </div>

          {/* Form & Map Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-gold/20">
                <h2 className="text-3xl font-serif text-ivory mb-6">Send Us a Message</h2>

                {/* Form Progress Bar */}
                <div className="mb-6">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gold to-yellow-400 transition-all duration-300"
                      style={{ width: `${formProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-ivory/60 mt-2">{Math.round(formProgress)}% complete</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div className="relative">
                    <label htmlFor="fullName" className="block text-sm font-medium text-ivory/80 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      onFocus={() => setActiveInput("fullName")}
                      onBlur={() => setActiveInput(null)}
                      required
                      className={`w-full px-4 py-4 bg-white/10 border rounded-xl text-ivory placeholder-ivory/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-none transition-all duration-300 ${
                        activeInput === "fullName" ? "border-gold scale-105" : "border-gold/30"
                      }`}
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="relative">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-ivory/80 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      onFocus={() => setActiveInput("phoneNumber")}
                      onBlur={() => setActiveInput(null)}
                      required
                      className={`w-full px-4 py-4 bg-white/10 border rounded-xl text-ivory placeholder-ivory/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-none transition-all duration-300 ${
                        activeInput === "phoneNumber" ? "border-gold scale-105" : "border-gold/30"
                      }`}
                      placeholder="+977 XXXXXXXXXX"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-medium text-ivory/80 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setActiveInput("email")}
                      onBlur={() => setActiveInput(null)}
                      required
                      className={`w-full px-4 py-4 bg-white/10 border rounded-xl text-ivory placeholder-ivory/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-none transition-all duration-300 ${
                        activeInput === "email" ? "border-gold scale-105" : "border-gold/30"
                      }`}
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Subject */}
                  <div className="relative">
                    <label htmlFor="subject" className="block text-sm font-medium text-ivory/80 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      onFocus={() => setActiveInput("subject")}
                      onBlur={() => setActiveInput(null)}
                      required
                      className={`w-full px-4 py-4 bg-white/10 border rounded-xl text-ivory focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 ${
                        activeInput === "subject" ? "border-gold scale-105" : "border-gold/30"
                      }`}
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((subject, index) => (
                        <option key={index} value={subject} className="bg-navy text-ivory">
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <label htmlFor="message" className="block text-sm font-medium text-ivory/80 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setActiveInput("message")}
                      onBlur={() => setActiveInput(null)}
                      required
                      rows={6}
                      className={`w-full px-4 py-4 bg-white/10 border rounded-xl text-ivory placeholder-ivory/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-none transition-all duration-300 ${
                        activeInput === "message" ? "border-gold scale-105" : "border-gold/30"
                      }`}
                      placeholder="Tell us about your waterproofing needs..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-gold to-yellow-400 text-navy py-4 rounded-xl font-semibold hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-navy mr-3"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-3" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>

                {/* Quick Contact */}
                <div className="mt-8 pt-8 border-t border-gold/20">
                  <h3 className="text-xl font-serif text-ivory mb-4">Prefer Direct Contact?</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="tel:+977"
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:from-emerald-500 hover:to-green-500 transition-all duration-300 transform hover:scale-105"
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                    </a>
                    <a
                      href="mailto:info@trinitywaterproofing.com"
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-pink-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105"
                    >
                      <Mail className="w-4 h-4" />
                      Email Us
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Office Location */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-gold/20 hover:border-gold/40 transition-all duration-300">
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-gold to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <MapPin className="w-12 h-12 text-navy" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-yellow-300/20 rounded-full animate-ping"></div>
                  </div>
                  <h3 className="text-2xl font-serif text-ivory mb-4">Our Location</h3>
                  <div className="space-y-2 mb-6">
                    <p className="text-ivory/90 font-medium">Trinity Waterproofing</p>
                    <p className="text-ivory/80">Kathmandu, Nepal</p>
                    <p className="text-ivory/80">Central Nepal Region</p>
                  </div>
                  <a
                    href="https://www.google.com/maps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <Globe className="w-5 h-5" />
                    View on Google Maps
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-gold/20">
                <h3 className="text-2xl font-serif text-ivory mb-4">Connect With Us</h3>
                <p className="text-ivory/70 mb-6">
                  Follow Trinity Waterproofing for project updates and industry insights
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className={`p-4 bg-gradient-to-r ${social.color} rounded-xl hover:scale-110 transition-all duration-300 shadow-lg group`}
                      aria-label={social.label}
                    >
                      <social.icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Help */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-gold/20">
                <h3 className="text-2xl font-serif text-ivory mb-6">Quick Links</h3>
                <div className="space-y-4">
                  {quickHelp.map((help, index) => (
                    <a
                      key={index}
                      href={help.href}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105 group"
                    >
                      <help.icon className="w-5 h-5 text-gold group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-ivory/80 group-hover:text-ivory transition-colors duration-300">
                        {help.title}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gold ml-auto group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div
        ref={(el) => {
          if (el) sectionsRef.current[2] = el
        }}
        className="py-20 bg-gradient-to-br from-gold/10 via-yellow-50 to-orange-50 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-serif text-navy mb-8">Stay Informed</h2>
            <p className="text-xl text-gray-700 mb-12 leading-relaxed">
              Subscribe to our newsletter for waterproofing tips, maintenance advice, and exclusive offers on our services.
            </p>

            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-gold to-yellow-400 text-navy px-8 py-4 rounded-xl font-semibold hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
              <div className="flex items-center justify-center gap-2 mt-4">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">No spam, unsubscribe anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-gradient-to-r from-gold to-yellow-400 text-navy p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-pulse">
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default ContactPage