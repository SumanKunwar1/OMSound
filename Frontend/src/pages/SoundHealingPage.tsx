"use client"

import { useState, useEffect, useRef } from "react"
import {
  Waves,
  Brain,
  Heart,
  CheckCircle,
  Calendar,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Zap,
  Target,
  ChevronDown,
  Star,
  Headphones,
  Timer,
  Award,
} from "lucide-react"

const SoundHealingPage = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeFrequency, setActiveFrequency] = useState(0)
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null)
  const [selectedSession, setSelectedSession] = useState<number | null>(null)
  const [soundWaves, setSoundWaves] = useState<number[]>([])
  const heroRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    // Generate sound wave animation data
    const interval = setInterval(() => {
      setSoundWaves(Array.from({ length: 20 }, () => Math.random() * 100))
    }, 100)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      clearInterval(interval)
    }
  }, [])

  const frequencies = [
    { hz: "396 Hz", name: "Liberation", color: "from-red-500 to-orange-500", description: "Release fear and guilt" },
    { hz: "417 Hz", name: "Change", color: "from-orange-500 to-yellow-500", description: "Facilitate transformation" },
    { hz: "528 Hz", name: "Love", color: "from-green-400 to-emerald-500", description: "DNA repair and love" },
    { hz: "639 Hz", name: "Connection", color: "from-blue-400 to-cyan-500", description: "Harmonious relationships" },
    { hz: "741 Hz", name: "Expression", color: "from-indigo-500 to-purple-500", description: "Creative expression" },
    { hz: "852 Hz", name: "Intuition", color: "from-purple-500 to-pink-500", description: "Spiritual awakening" },
  ]

  const benefits = [
    {
      icon: Waves,
      title: "Stress Reduction",
      description: "Lowers cortisol levels by up to 25% and induces deep relaxation",
      color: "text-blue-400",
      bgColor: "from-blue-500/20 to-cyan-500/20",
      stat: "25% reduction",
      detail: "Clinical studies show significant stress hormone reduction after just one session",
    },
    {
      icon: Brain,
      title: "Improved Sleep",
      description: "Helps regulate sleep patterns and improves sleep quality",
      color: "text-purple-400",
      bgColor: "from-purple-500/20 to-indigo-500/20",
      stat: "87% better sleep",
      detail: "Participants report deeper, more restorative sleep within 3 sessions",
    },
    {
      icon: Heart,
      title: "Pain Relief",
      description: "Reduces perception of chronic pain and inflammation",
      color: "text-red-400",
      bgColor: "from-red-500/20 to-pink-500/20",
      stat: "40% pain reduction",
      detail: "Effective for chronic pain, arthritis, and muscle tension",
    },
    {
      icon: Zap,
      title: "Emotional Release",
      description: "Facilitates processing of emotions and trauma",
      color: "text-green-400",
      bgColor: "from-green-500/20 to-emerald-500/20",
      stat: "Deep healing",
      detail: "Safe space for emotional processing and energetic clearing",
    },
    {
      icon: Target,
      title: "Enhanced Focus",
      description: "Improves concentration and mental clarity",
      color: "text-yellow-400",
      bgColor: "from-yellow-500/20 to-orange-500/20",
      stat: "60% focus boost",
      detail: "Increased cognitive performance and mental sharpness",
    },
    {
      icon: Sparkles,
      title: "Chakra Balancing",
      description: "Aligns and harmonizes the body's energy centers",
      color: "text-pink-400",
      bgColor: "from-pink-500/20 to-purple-500/20",
      stat: "Energy alignment",
      detail: "Restore natural energy flow and spiritual balance",
    },
  ]

  const sessions = [
    {
      title: "Harmony Starter",
      price: "$75",
      originalPrice: "$95",
      duration: "60 minutes",
      description: "A gentle introduction to sound healing with Himalayan singing bowls",
      features: ["Full-body relaxation", "Chakra balancing", "Guided meditation", "Personalized intention setting"],
      popular: false,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Deep Transformation",
      price: "$120",
      originalPrice: "$150",
      duration: "90 minutes",
      description: "An intensive session combining multiple sound therapy techniques",
      features: ["Crystal bowls therapy", "Vocal toning", "Energy clearing", "Post-session integration"],
      popular: true,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Sacred Circle",
      price: "$200",
      originalPrice: "$250",
      duration: "120 minutes",
      description: "Customized sound healing experience for groups of 2-6 people",
      features: [
        "Personalized for group needs",
        "Combination of instruments",
        "Shared intention setting",
        "Take-home practices",
      ],
      popular: false,
      color: "from-green-500 to-emerald-500",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Wellness Coach",
      text: "The sound healing session completely transformed my stress levels. I felt like I was floating in pure bliss.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Michael Rodriguez",
      role: "Meditation Teacher",
      text: "I've never experienced such deep relaxation. The bowls created the most beautiful healing space.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Emma Thompson",
      role: "Yoga Instructor",
      text: "This session helped me release years of stored tension. Absolutely life-changing experience.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-indigo-900 to-purple-900 overflow-hidden pt-16">
      {/* Floating Sound Waves */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {soundWaves.map((height, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-t from-gold/20 to-transparent rounded-full animate-pulse"
            style={{
              left: `${5 + i * 5}%`,
              bottom: "10%",
              width: "2px",
              height: `${height}px`,
              animationDelay: `${i * 0.1}s`,
              transform: `translateY(${mousePosition.y * 0.01}px)`,
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <div className="w-2 h-2 bg-gold/30 rounded-full blur-sm"></div>
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden pt-24"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-purple-900/80 to-indigo-900/90 z-10" />

        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-indigo-600/20 animate-pulse"></div>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-gold/10 to-yellow-300/10 animate-ping"
              style={{
                left: `${20 + i * 10}%`,
                top: `${20 + i * 8}%`,
                width: `${50 + i * 20}px`,
                height: `${50 + i * 20}px`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + i * 0.3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-20 text-center text-ivory max-w-5xl px-4">
          <div className="mb-8">
            <h1 className="text-7xl md:text-9xl font-serif mb-6 bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent animate-pulse">
              Sound Healing
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              {frequencies.slice(0, 3).map((freq, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 rounded-full bg-gradient-to-r ${freq.color} text-white text-sm font-medium animate-bounce`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {freq.hz}
                </div>
              ))}
            </div>
            <p className="text-2xl md:text-3xl mb-8 opacity-90 leading-relaxed">
              Experience the transformative power of ancient sound therapy
            </p>
          </div>

          {/* Interactive Sound Control */}
          <div className="flex flex-col items-center gap-6 mb-12">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-3 bg-gradient-to-r from-gold to-yellow-400 text-navy px-10 py-5 rounded-full hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-110 shadow-2xl"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                <span className="font-semibold text-lg">{isPlaying ? "Pause" : "Play"} Healing Sounds</span>
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300"
              >
                {isMuted ? <VolumeX className="w-6 h-6 text-gold" /> : <Volume2 className="w-6 h-6 text-gold" />}
              </button>
            </div>

            {/* Sound Visualizer */}
            <div className="flex items-end gap-1 h-16">
              {soundWaves.slice(0, 12).map((height, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-t from-gold to-yellow-300 rounded-full transition-all duration-100"
                  style={{
                    width: "4px",
                    height: `${isPlaying ? height * 0.5 : 10}px`,
                    opacity: isPlaying ? 1 : 0.3,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/contact"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-10 py-4 rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
            >
              Book Your Session
            </a>
            <button className="border-2 border-gold text-gold px-10 py-4 rounded-full hover:bg-gold hover:text-navy transition-all duration-300 transform hover:scale-105 font-semibold">
              Explore Benefits
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gold" />
        </div>
      </div>

      {/* Frequency Healing Section */}
      <div
        ref={(el) => {
          if (el) sectionsRef.current[0] = el
        }}
        className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900 relative"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-gold mb-6">Sacred Frequencies</h2>
            <p className="text-xl text-ivory/80 max-w-3xl mx-auto">
              Each frequency carries unique healing properties, working with your body's natural resonance to restore
              balance and harmony.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {frequencies.map((freq, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onMouseEnter={() => setActiveFrequency(index)}
                onMouseLeave={() => setActiveFrequency(0)}
              >
                <div
                  className={`bg-gradient-to-br ${freq.color} p-8 rounded-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-1 shadow-2xl`}
                >
                  <div className="text-center text-white">
                    <div className="text-4xl font-bold mb-2">{freq.hz}</div>
                    <div className="text-xl font-serif mb-4">{freq.name}</div>
                    <p className="text-sm opacity-90">{freq.description}</p>
                    <div className="mt-6">
                      <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white rounded-full transition-all duration-1000"
                          style={{
                            width: activeFrequency === index ? "100%" : "0%",
                            transitionDelay: activeFrequency === index ? "0.2s" : "0s",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What is Sound Healing */}
      <div
        ref={(el) => {
          if (el) sectionsRef.current[1] = el
        }}
        className="py-20 bg-gradient-to-br from-ivory via-white to-blue-50 relative"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl font-serif text-navy mb-8 relative">
                The Science of Sound
                <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-gold to-yellow-400"></div>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Sound healing is an ancient practice that uses vibrational sound to help reduce stress, alter
                consciousness, and create a deep sense of peace and well-being. Every cell in our body vibrates at
                specific frequencies.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                When we're stressed or unwell, these frequencies can become imbalanced. Sound healing works by
                introducing pure, therapeutic frequencies that help restore our natural harmonic balance, promoting
                healing from within.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                {[
                  { icon: Waves, title: "Vibrational Resonance", desc: "Deep tissue penetration" },
                  { icon: Brain, title: "Brainwave Entrainment", desc: "Meditative states" },
                  { icon: Heart, title: "Nervous System Reset", desc: "Natural relaxation" },
                ].map((item, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-r from-gold/20 to-yellow-200/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-8 h-8 text-gold" />
                    </div>
                    <h4 className="font-serif text-navy mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/placeholder.svg?height=600&width=800"
                  alt="Sound healing session"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white/20 backdrop-blur-sm p-6 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110">
                    <Play className="w-12 h-12 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div
        ref={(el) => {
          if (el) sectionsRef.current[2] = el
        }}
        className="py-20 bg-gradient-to-br from-navy via-indigo-900 to-purple-900 relative overflow-hidden"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-gold mb-6">Proven Healing Benefits</h2>
            <p className="text-xl text-ivory/80 max-w-3xl mx-auto">
              Scientific research supports the therapeutic effects of sound healing on both physical and mental
              well-being
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredBenefit(index)}
                onMouseLeave={() => setHoveredBenefit(null)}
              >
                <div
                  className={`bg-gradient-to-br ${benefit.bgColor} backdrop-blur-sm border border-gold/20 rounded-2xl p-8 transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-2xl`}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className={`p-4 rounded-full bg-gradient-to-r from-gold/20 to-yellow-200/20 ${benefit.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <benefit.icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-serif text-ivory mb-2">{benefit.title}</h3>
                      <div className="text-gold font-semibold text-sm mb-3">{benefit.stat}</div>
                    </div>
                  </div>
                  <p className="text-ivory/80 mb-4">{benefit.description}</p>
                  <div
                    className={`overflow-hidden transition-all duration-500 ${hoveredBenefit === index ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <p className="text-ivory/60 text-sm border-t border-gold/20 pt-4">{benefit.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sessions Section */}
      <div
        ref={(el) => {
          if (el) sectionsRef.current[3] = el
        }}
        className="py-20 bg-gradient-to-br from-ivory via-white to-purple-50 relative"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-navy mb-6">Choose Your Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select from our range of therapeutic sound experiences designed for different needs and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sessions.map((session, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => setSelectedSession(selectedSession === index ? null : index)}
              >
                <div
                  className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${session.popular ? "ring-4 ring-gold/50" : ""}`}
                >
                  {session.popular && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-gold to-yellow-400 text-navy px-3 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  )}

                  <div className={`h-2 bg-gradient-to-r ${session.color}`}></div>

                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-serif text-navy">{session.title}</h3>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-gold">{session.price}</div>
                        <div className="text-sm text-gray-400 line-through">{session.originalPrice}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-6">
                      <Timer className="w-5 h-5 text-gold" />
                      <span className="text-gray-600 font-medium">{session.duration}</span>
                    </div>

                    <p className="text-gray-700 mb-8 leading-relaxed">{session.description}</p>

                    <div className="space-y-3 mb-8">
                      {session.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      className={`w-full bg-gradient-to-r ${session.color} text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                    >
                      Book This Session
                    </button>

                    {selectedSession === index && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg animate-fade-in">
                        <p className="text-sm text-gray-600 mb-3">What to expect:</p>
                        <ul className="text-sm text-gray-500 space-y-1">
                          <li>• Comfortable clothing recommended</li>
                          <li>• Arrive 10 minutes early</li>
                          <li>• Bring water bottle</li>
                          <li>• No experience necessary</li>
                        </ul>
                      </div>
                    )}
                  </div>
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
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-gold mb-6">Healing Stories</h2>
            <p className="text-xl text-ivory/80 max-w-3xl mx-auto">
              Discover how sound healing has transformed lives and brought peace to our community
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

      {/* Booking Section */}
      <div
        ref={(el) => {
          if (el) sectionsRef.current[5] = el
        }}
        className="py-20 bg-gradient-to-br from-gold/10 via-yellow-50 to-orange-50 relative"
      >
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-serif text-navy mb-8">Ready to Begin Your Healing Journey?</h2>
            <p className="text-xl text-gray-700 mb-12 leading-relaxed">
              Book your sound healing session today and experience the transformative power of therapeutic sound. Our
              certified practitioners are here to guide you on your path to wellness.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Calendar className="text-gold mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-serif text-navy mb-4">Flexible Scheduling</h3>
                <p className="text-gray-600 mb-6">Sessions available 7 days a week, including evenings and weekends</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["Morning", "Afternoon", "Evening", "Weekend"].map((time, index) => (
                    <span key={index} className="px-3 py-1 bg-gold/20 text-navy rounded-full text-sm">
                      {time}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Award className="text-gold mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-serif text-navy mb-4">Certified Practitioners</h3>
                <p className="text-gray-600 mb-6">
                  All sessions led by trained sound healing professionals with years of experience
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["Certified", "Experienced", "Compassionate", "Professional"].map((quality, index) => (
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
                  Get 20% off your first session + a free 15-minute consultation to help you choose the perfect healing
                  experience
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="bg-gradient-to-r from-gold to-yellow-400 text-navy px-10 py-4 rounded-full font-semibold hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Schedule Consultation
                  </a>
                  <a
                    href="/shop"
                    className="border-2 border-gold text-gold px-10 py-4 rounded-full hover:bg-gold hover:text-navy transition-all duration-300 transform hover:scale-105 font-semibold"
                  >
                    Browse Singing Bowls
                  </a>
                </div>
              </div>
            </div>

            <p className="text-gray-500 text-sm mt-8">
              Questions? Contact us at info@omsound.com or call +977 1234 5678
            </p>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-gradient-to-r from-gold to-yellow-400 text-navy p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-pulse">
          <Headphones className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default SoundHealingPage
