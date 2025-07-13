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
  Youtube,
  MessageCircle,
  Sparkles,
  Globe,
  Users,
  Award,
  ChevronDown,
  Star,
  CheckCircle,
  ArrowRight,
  Share2,
} from "lucide-react"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
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
    setFormProgress((filledFields / 4) * 100)
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

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)

    // Show success message
    alert("Thank you for your message! We'll get back to you within 24 hours.")
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Workshop",
      details: ["Peace Love & Art Community", "Sanepa, Lalitpur", "Kathmandu Valley, Nepal"],
      extra: "Open Monday-Friday, 10am-6pm NPT",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+977 1234 5678"],
      extra: "Available 9am-5pm (GMT+5:45)",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-500/20 to-emerald-500/20",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["suman.soundjourneynepal@gmail.com"], // Updated email address
      extra: "We typically respond within 24 hours",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-500/20 to-pink-500/20",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 10am-6pm", "Sat: 10am-4pm", "Sun: Closed"],
      extra: "Nepal Standard Time (GMT+5:45)",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-500/20 to-red-500/20",
    },
  ]

  const subjects = [
    "General Inquiry",
    "Product Information",
    "Custom Orders",
    "Wholesale Inquiries",
    "Sound Healing Sessions",
    "Shipping & Returns",
    "Technical Support",
    "Partnership Opportunities",
  ]

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://instagram.com/omsoundnepal",
      label: "Instagram",
      color: "from-pink-500 to-purple-500",
    },
    {
      icon: Facebook,
      href: "https://facebook.com/omsoundnepal",
      label: "Facebook",
      color: "from-blue-600 to-blue-700",
    },
    { icon: Youtube, href: "https://youtube.com/omsoundnepal", label: "YouTube", color: "from-red-500 to-red-600" },
    { icon: Share2, href: "https://tiktok.com/@omsoundnepal", label: "TikTok", color: "from-black to-gray-700" }, // Added TikTok
  ]

  const quickHelp = [
    { title: "Frequently Asked Questions", href: "/faq", icon: MessageCircle },
    { title: "Shipping & Returns", href: "/shipping", icon: Globe },
    { title: "Bowl Care Guide", href: "/care-guide", icon: Award },
  ]

  const stats = [
    { number: "500+", label: "Happy Customers", icon: Users },
    { number: "24hrs", label: "Response Time", icon: Clock },
    { number: "15+", label: "Years Experience", icon: Award },
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
        className="relative h-screen flex items-center justify-center overflow-hidden pt-24" // Increased padding-top
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-purple-900/80 to-indigo-900/90 z-10" />

        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-indigo-600/20 animate-pulse"></div>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-gold/10 to-yellow-300/10 animate-ping"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + i * 10}%`,
                width: `${60 + i * 30}px`,
                height: `${60 + i * 30}px`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${3 + i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-20 text-center text-ivory max-w-5xl px-4 mt-16">
          {" "}
          {/* Added margin-top here */}
          <div className="mb-12">
            <h1 className="text-7xl md:text-9xl font-serif mb-8 bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent animate-pulse">
              Get in Touch
            </h1>
            <p className="text-2xl md:text-3xl mb-8 opacity-90 leading-relaxed max-w-3xl mx-auto">
              Have questions about our singing bowls, sound healing sessions, or custom orders? We're here to help you
              find the perfect resonance for your journey.
            </p>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-gold/20 hover:border-gold/40 transition-all duration-300 transform hover:scale-105"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <stat.icon
                  className={`w-8 h-8 mx-auto mb-3 transition-all duration-300 ${hoveredCard === index ? "text-gold scale-110" : "text-ivory"}`}
                />
                <div
                  className={`text-2xl font-bold mb-1 transition-all duration-300 ${hoveredCard === index ? "text-gold" : "text-ivory"}`}
                >
                  {stat.number}
                </div>
                <div className="text-ivory/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-gradient-to-r from-gold to-yellow-400 text-navy px-10 py-4 rounded-full hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold">
              Start Conversation
            </button>
            <a
              href="https://www.google.com/maps/place/Peace+Love+%26+Art+Community/@27.6805106,85.2994419,17z/data=!4m14!1m7!3m6!1s0x39eb19004c6db23f:0xf8bd651a8bf58139!2sPeace+Love+%26+Art+Community!8m2!3d27.6805059!4d85.3040553!16s%2Fg%2F11xgq1gfb8!3m5!1s0x39eb19004c6db23f:0xf8bd651a8bf58139!8m2!3d27.6805059!4d85.3040553!16s%2Fg%2F11xgq1gfb8?entry=ttu&g_ep=EgoyMDI1MDcwOS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-gold text-gold px-10 py-4 rounded-full hover:bg-gold hover:text-navy transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              View Location
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gold" />
        </div>
      </div>

      {/* Contact Information Cards */}
      <div
        ref={(el) => {
          if (el) sectionsRef.current[0] = el
        }}
        className="py-20 bg-gradient-to-br from-ivory via-white to-blue-50 relative"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-navy mb-6">How to Reach Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple ways to connect with our team. Choose what works best for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group cursor-pointer h-full" // Added h-full here
                onMouseEnter={() => setHoveredCard(index + 10)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`bg-gradient-to-br ${info.bgColor} backdrop-blur-sm border border-gold/20 rounded-2xl p-8 transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl h-full flex flex-col`} // Added h-full and flex-col
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${info.color} rounded-full mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <info.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-serif text-navy mb-4">{info.title}</h3>
                  <div className="space-y-2 mb-4 flex-grow">
                    {" "}
                    {/* flex-grow to push extra to bottom */}
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-gray-700 font-medium">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm mt-auto">{info.extra}</p> {/* mt-auto to push to bottom */}
                  <div
                    className={`mt-4 h-1 bg-gradient-to-r ${info.color} rounded-full transform transition-all duration-500 ${hoveredCard === index + 10 ? "scale-x-100" : "scale-x-0"} origin-left`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form & Map Section */}
      <div
        ref={(el) => {
          if (el) sectionsRef.current[1] = el
        }}
        className="py-20 bg-gradient-to-br from-navy via-indigo-900 to-purple-900 relative"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="text-5xl font-serif text-gold mb-6">Send Us a Message</h2>
                <p className="text-xl text-ivory/80">
                  Ready to start your sound healing journey? Fill out the form below and we'll get back to you within 24
                  hours.
                </p>
              </div>

              {/* Form Progress */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-gold/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-ivory/70 text-sm">Form Progress</span>
                  <span className="text-gold text-sm font-semibold">{Math.round(formProgress)}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold to-yellow-400 rounded-full transition-all duration-500"
                    style={{ width: `${formProgress}%` }}
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-medium text-ivory/80 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setActiveInput("name")}
                      onBlur={() => setActiveInput(null)}
                      required
                      className={`w-full px-4 py-4 bg-white/10 border rounded-xl text-ivory placeholder-ivory/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 ${activeInput === "name" ? "border-gold scale-105" : "border-gold/30"}`}
                      placeholder="Enter your full name"
                    />
                  </div>
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
                      className={`w-full px-4 py-4 bg-white/10 border rounded-xl text-ivory placeholder-ivory/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 ${activeInput === "email" ? "border-gold scale-105" : "border-gold/30"}`}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

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
                    className={`w-full px-4 py-4 bg-white/10 border rounded-xl text-ivory focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 ${activeInput === "subject" ? "border-gold scale-105" : "border-gold/30"}`}
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject} className="bg-navy text-ivory">
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

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
                    className={`w-full px-4 py-4 bg-white/10 border rounded-xl text-ivory placeholder-ivory/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-none transition-all duration-300 ${activeInput === "message" ? "border-gold scale-105" : "border-gold/30"}`}
                    placeholder="Tell us how we can help you..."
                  />
                </div>

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
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
                <h3 className="text-xl font-serif text-ivory mb-4">Prefer Direct Contact?</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+97712345678"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:from-emerald-500 hover:to-green-500 transition-all duration-300 transform hover:scale-105"
                  >
                    <Phone className="w-4 h-4" />
                    Call Now
                  </a>
                  <a
                    href="mailto:suman.soundjourneynepal@gmail.com" // Updated email address
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-pink-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105"
                  >
                    <Mail className="w-4 h-4" />
                    Email Us
                  </a>
                </div>
              </div>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Interactive Map */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-gold/20 hover:border-gold/40 transition-all duration-300">
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-gold to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <MapPin className="w-12 h-12 text-navy" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-yellow-300/20 rounded-full animate-ping"></div>
                  </div>
                  <h3 className="text-2xl font-serif text-ivory mb-4">Our Workshop Location</h3>
                  <div className="space-y-2 mb-6">
                    <p className="text-ivory/90 font-medium">Peace Love & Art Community</p>
                    <p className="text-ivory/80">Sanepa, Lalitpur</p>
                    <p className="text-ivory/80">Kathmandu Valley, Nepal</p>
                  </div>
                  <a
                    href="https://www.google.com/maps/place/Peace+Love+%26+Art+Community/@27.6805106,85.2994419,17z/data=!4m14!1m7!3m6!1s0x39eb19004c6db23f:0xf8bd651a8bf58139!2sPeace+Love+%26+Art+Community!8m2!3d27.6805059!4d85.3040553!16s%2Fg%2F11xgq1gfb8!3m5!1s0x39eb19004c6db23f:0xf8bd651a8bf58139!8m2!3d27.6805059!4d85.3040553!16s%2Fg%2F11xgq1gfb8?entry=ttu&g_ep=EgoyMDI1MDcwOS4wIKXMDSoASAFQAw%3D%3D"
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
                  Follow our journey and see behind-the-scenes content from our workshop
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
                <h3 className="text-2xl font-serif text-ivory mb-6">Quick Help</h3>
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
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-serif text-navy mb-8">Stay Connected</h2>
            <p className="text-xl text-gray-700 mb-12 leading-relaxed">
              Subscribe to our newsletter for updates on new products, sound healing tips, and exclusive offers.
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
                  Subscribe Now
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
