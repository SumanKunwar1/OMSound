"use client"

import { useState, useEffect, useRef } from "react"
import {
  Droplets,
  Shield,
  Home,
  CheckCircle,
  Calendar,
  Play,
  Pause,
  Sparkles,
  Zap,
  Target,
  ChevronDown,
  Star,
  Wrench,
  Clock,
  Award,
  Hammer,
  Pipette,
  Bug,
  Home as HomeIcon,
  Layers,
} from "lucide-react"

const ServicesPage = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null)
  const [selectedService, setSelectedService] = useState<number | null>(null)
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

  const protectionTypes = [
    { type: "Waterproof Coatings", color: "from-blue-500 to-cyan-500", icon: Droplets, description: "Liquid applied protection" },
    { type: "Membranes", color: "from-purple-500 to-pink-500", icon: Layers, description: "Sheet-based barriers" },
    { type: "Epoxy Coatings", color: "from-green-500 to-emerald-500", icon: Shield, description: "Durable finish coats" },
    { type: "Repair Solutions", color: "from-orange-500 to-red-500", icon: Wrench, description: "Fix existing damage" },
    { type: "Anti-Termite", color: "from-indigo-500 to-blue-500", icon: Bug, description: "Pest protection" },
    { type: "Joint Treatment", color: "from-yellow-500 to-orange-500", icon: Hammer, description: "Expansion gap sealing" },
  ]

  const benefits = [
    {
      icon: Shield,
      title: "Complete Protection",
      description: "Comprehensive waterproofing coverage for all structural elements",
      color: "text-blue-400",
      bgColor: "from-blue-500/20 to-cyan-500/20",
      stat: "100% coverage",
      detail: "Professional assessment ensures all vulnerable areas are protected from water infiltration",
    },
    {
      icon: Droplets,
      title: "Moisture Prevention",
      description: "Eliminates dampness, seepage, and water damage at the source",
      color: "text-cyan-400",
      bgColor: "from-cyan-500/20 to-blue-500/20",
      stat: "Zero leaks",
      detail: "Advanced membranes and sealants prevent water penetration completely",
    },
    {
      icon: Home,
      title: "Property Value",
      description: "Increases property valuation and long-term structural integrity",
      color: "text-emerald-400",
      bgColor: "from-emerald-500/20 to-green-500/20",
      stat: "Higher resale",
      detail: "Waterproofed properties command premium prices in real estate market",
    },
    {
      icon: Zap,
      title: "Long-Lasting",
      description: "10-20 year warranty with materials that withstand harsh conditions",
      color: "text-yellow-400",
      bgColor: "from-yellow-500/20 to-orange-500/20",
      stat: "20-year life",
      detail: "Premium materials engineered for durability and environmental resistance",
    },
    {
      icon: Sparkles,
      title: "Health & Safety",
      description: "Prevents mold, mildew, and fungal growth that threaten occupant health",
      color: "text-pink-400",
      bgColor: "from-pink-500/20 to-purple-500/20",
      stat: "Healthy spaces",
      detail: "Dry environments eliminate allergens and health hazards from moisture",
    },
    {
      icon: Target,
      title: "Cost Savings",
      description: "Prevents expensive structural damage and costly repairs down the line",
      color: "text-green-400",
      bgColor: "from-green-500/20 to-emerald-500/20",
      stat: "Save 50%+",
      detail: "Preventive waterproofing costs far less than fixing water damage",
    },
  ]

  const services = [
    {
      title: "Bathroom Waterproofing",
      icon: HomeIcon,
      price: "NPR 15,000",
      originalPrice: "NPR 20,000",
      duration: "2-3 days",
      description: "Expert techniques to keep bathrooms watertight, preventing leaks and moisture buildup",
      features: ["Tile sealing", "Drain protection", "Wall membrane", "Floor treatment", "Mold prevention"],
      popular: false,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Terrace Waterproofing",
      icon: Layers,
      price: "NPR 25,000",
      originalPrice: "NPR 35,000",
      duration: "3-5 days",
      description: "Durable membrane coating that ensures terraces remain dry and long-lasting, protecting from rain damage",
      features: ["Membrane application", "Expansion joint sealing", "Drainage system", "UV protection", "Thermal insulation"],
      popular: true,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Underground Basement",
      icon: Droplets,
      price: "NPR 40,000",
      originalPrice: "NPR 55,000",
      duration: "5-7 days",
      description: "Comprehensive solutions including membranes, drainage systems, crack sealing, and moisture barriers",
      features: ["Full waterproofing", "Drainage installation", "Crack repair", "Moisture barriers", "Long-term protection"],
      popular: false,
      color: "from-green-500 to-emerald-500",
    },
  ]

  const allServices = [
    {
      title: "Bathroom Waterproofing",
      description: "Our experts know the right techniques to keep your bathroom watertight, preventing leaks and moisture buildup.",
      image: "/placeholder.svg?height=300&width=400",
      icon: HomeIcon,
    },
    {
      title: "Terrace Waterproofing",
      description: "We apply a waterproofing membrane that ensures your terrace remains dry and long-lasting, protecting it from rain damage.",
      image: "/placeholder.svg?height=300&width=400",
      icon: Layers,
    },
    {
      title: "Swimming Pool Sealing",
      description: "Our specialists use high-quality materials to seal pool surfaces and prevent leaks, ensuring perfect condition.",
      image: "/placeholder.svg?height=300&width=400",
      icon: Droplets,
    },
    {
      title: "Underground Basement",
      description: "Comprehensive solutions including membranes, drainage systems, crack sealing, and moisture barriers for complete protection.",
      image: "/placeholder.svg?height=300&width=400",
      icon: Shield,
    },
    {
      title: "Water Tank Protection",
      description: "Reliable leak-proof solutions for water tanks, ensuring long-lasting protection and preventing water leakage.",
      image: "/placeholder.svg?height=300&width=400",
      icon: Pipette,
    },
    {
      title: "Epoxy/PU Flooring",
      description: "High-quality epoxy and polyurethane flooring and coating services for durability and seamless finish.",
      image: "/placeholder.svg?height=300&width=400",
      icon: Sparkles,
    },
    {
      title: "Anti-Termite Treatment",
      description: "Protect your property from termite damage with our specialized, safe, and effective treatments.",
      image: "/placeholder.svg?height=300&width=400",
      icon: Bug,
    },
    {
      title: "Expansion Joint Treatment",
      description: "Installation of flexible materials between structural gaps to accommodate movement and prevent damage & leakage.",
      image: "/placeholder.svg?height=300&width=400",
      icon: Hammer,
    },
    {
      title: "Pest Control",
      description: "Specialized services eliminating termites, controlling cockroaches, and managing mice infestations safely.",
      image: "/placeholder.svg?height=300&width=400",
      icon: Bug,
    },
  ]

  const testimonials = [
    {
      name: "Ramesh Kumar",
      role: "Homeowner",
      text: "Trinity fixed our basement flooding problem completely. Haven't seen a drop of water since! Excellent service.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Priya Sharma",
      role: "Property Developer",
      text: "We use Trinity for all our commercial projects. Their professionalism and quality are unmatched in the industry.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Arun Patel",
      role: "Building Manager",
      text: "The terrace waterproofing has held up perfectly through three monsoon seasons. Highly recommended!",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-indigo-900 to-purple-900 overflow-hidden pt-16">
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

      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/60 to-transparent z-10" />

        {/* Background Video/Image */}
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
          <img
            src="/placeholder.svg?height=1080&width=1920"
            alt="Waterproofing protection"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </video>

        <div className="relative z-20 text-center text-ivory max-w-4xl px-4">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-serif mb-6 bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent animate-pulse">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">Comprehensive Waterproofing Solutions for Every Structure</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 bg-gold text-navy px-8 py-4 rounded-full hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isPlaying ? "Pause" : "Play"} Services Overview
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gold" />
        </div>
      </div>

      {/* Protection Types Section */}
      <div
        ref={(el) => {
          if (el) sectionsRef.current[0] = el
        }}
        className="py-20 bg-white/5 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-gold mb-6">Protection Methods</h2>
            <p className="text-xl text-ivory/80 max-w-3xl mx-auto">
              We offer diverse waterproofing solutions tailored to your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {protectionTypes.map((protection, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-navy/60 to-navy/40 backdrop-blur-sm rounded-2xl p-8 border border-gold/20 hover:border-gold/40 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${protection.color} rounded-full mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <protection.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-serif text-gold mb-3">{protection.type}</h3>
                <p className="text-ivory/70">{protection.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div
        ref={(el) => {
          if (el) sectionsRef.current[1] = el
        }}
        className="py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-navy relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-gold mb-6">Why Choose Trinity?</h2>
            <p className="text-xl text-ivory/80 max-w-3xl mx-auto">
              Experience the comprehensive protection and peace of mind our waterproofing services provide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredBenefit(index)}
                onMouseLeave={() => setHoveredBenefit(null)}
                className={`bg-gradient-to-br ${benefit.bgColor} rounded-2xl p-8 border border-gold/20 hover:border-gold/50 transition-all duration-300 transform ${
                  hoveredBenefit === index ? "scale-105 shadow-2xl" : ""
                }`}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gold/20 rounded-full mb-6`}>
                  <benefit.icon className={`w-7 h-7 ${benefit.color}`} />
                </div>
                <h3 className="text-2xl font-serif text-ivory mb-3">{benefit.title}</h3>
                <p className="text-ivory/70 mb-4">{benefit.description}</p>
                <div className="pt-4 border-t border-gold/20">
                  <div className="text-2xl font-bold text-gold mb-2">{benefit.stat}</div>
                  <p className="text-ivory/60 text-sm">{benefit.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Packages Section */}
      <div
        ref={(el) => {
          if (el) sectionsRef.current[2] = el
        }}
        className="py-20 bg-gradient-to-br from-navy via-purple-900 to-indigo-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-gold mb-6">Popular Service Packages</h2>
            <p className="text-xl text-ivory/80 max-w-3xl mx-auto">
              Choose from our carefully designed packages for maximum value and protection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => setSelectedService(selectedService === index ? null : index)}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
              >
                {service.popular && (
                  <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-gold to-yellow-400 text-navy px-4 py-2 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}

                <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <service.icon className="w-8 h-8 text-gold mb-3" />
                      <h3 className="text-2xl font-serif text-navy">{service.title}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gold">{service.price}</div>
                      <div className="text-sm text-gray-400 line-through">{service.originalPrice}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="w-5 h-5 text-gold" />
                    <span className="text-gray-600 font-medium">{service.duration}</span>
                  </div>

                  <p className="text-gray-700 mb-8 leading-relaxed">{service.description}</p>

                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className={`w-full bg-gradient-to-r ${service.color} text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                  >
                    Get Quote
                  </button>

                  {selectedService === index && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg animate-fade-in">
                      <p className="text-sm text-gray-600 mb-3">What's included:</p>
                      <ul className="text-sm text-gray-500 space-y-1">
                        <li>• Free site inspection</li>
                        <li>• Material & labor warranty</li>
                        <li>• Professional installation team</li>
                        <li>• Post-service support</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Services Grid Section */}
      <div
        ref={(el) => {
          if (el) sectionsRef.current[3] = el
        }}
        className="py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-navy"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-gold mb-6">All Our Services</h2>
            <p className="text-xl text-ivory/80 max-w-3xl mx-auto">
              Complete range of waterproofing and protection solutions for residential and commercial properties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((service, index) => (
              <div
                key={index}
                className="group relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-gold/20 hover:border-gold/40 transition-all duration-300 transform hover:scale-105"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/40 to-transparent"></div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="text-xl font-serif text-ivory">{service.title}</h3>
                  </div>
                  <p className="text-ivory/70 text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div
        ref={(el) => {
          if (el) sectionsRef.current[4] = el
        }}
        className="py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-navy relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-gold mb-6">Client Success Stories</h2>
            <p className="text-xl text-ivory/80 max-w-3xl mx-auto">
              Hear from satisfied customers who trusted Trinity with their protection needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-gold/20 hover:border-gold/40 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gold"
                  />
                  <div>
                    <h4 className="text-ivory font-semibold">{testimonial.name}</h4>
                    <p className="text-ivory/60 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-current" />
                  ))}
                </div>
                <p className="text-ivory/80 italic leading-relaxed">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div
        ref={(el) => {
          if (el) sectionsRef.current[5] = el
        }}
        className="py-20 bg-gradient-to-br from-gold/10 via-yellow-50 to-orange-50 relative"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-serif text-navy mb-8">Ready to Protect Your Property?</h2>
          <p className="text-xl text-gray-700 mb-12 leading-relaxed">
            Schedule your free site inspection today and discover how Trinity Waterproofing can provide comprehensive 
            protection for your residential or commercial property. Our certified professionals are ready to assess 
            your needs and provide customized solutions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Calendar className="text-gold mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-serif text-navy mb-4">Free Inspection</h3>
              <p className="text-gray-600 mb-6">We'll assess your property and recommend the best protection solutions</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["Residential", "Commercial", "Industrial", "Urgent"].map((type, index) => (
                  <span key={index} className="px-3 py-1 bg-gold/20 text-navy rounded-full text-sm">
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Award className="text-gold mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-serif text-navy mb-4">Expert Team</h3>
              <p className="text-gray-600 mb-6">
                20+ years experience with certified professionals and proven track record
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["ISO Certified", "Experienced", "Licensed", "Insured"].map((quality, index) => (
                  <span key={index} className="px-3 py-1 bg-gold/20 text-navy rounded-full text-sm">
                    {quality}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-navy to-indigo-900 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-yellow-300/10"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-serif mb-4">Special Offer for New Clients</h3>
              <p className="text-lg mb-6 opacity-90">
                Get 15% off your first service + free consultation to customize the perfect waterproofing solution for your needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-gradient-to-r from-gold to-yellow-400 text-navy px-10 py-4 rounded-full font-semibold hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Schedule Free Inspection
                </a>
                <a
                  href="/products"
                  className="border-2 border-gold text-gold px-10 py-4 rounded-full hover:bg-gold hover:text-navy transition-all duration-300 transform hover:scale-105 font-semibold"
                >
                  View Products
                </a>
              </div>
            </div>
          </div>

          <p className="text-gray-500 text-sm mt-8">
            Questions? Contact us at info@trinitywaterproofing.com or call +977 1-XXXX-XXXX
          </p>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-gradient-to-r from-gold to-yellow-400 text-navy p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-pulse">
          <Shield className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default ServicesPage