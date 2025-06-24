import { motion } from "framer-motion";
import { Waves, Brain, Heart, Clock, CheckCircle, Calendar, Users } from "lucide-react";

// Mock data for benefits
const benefits = [
  {
    icon: Waves,
    title: "Stress Reduction",
    description: "Lowers cortisol levels by up to 25% and induces deep relaxation",
    color: "text-blue-400"
  },
  {
    icon: Brain,
    title: "Improved Sleep",
    description: "Helps regulate sleep patterns and improves sleep quality",
    color: "text-purple-400"
  },
  {
    icon: Heart,
    title: "Pain Relief",
    description: "Reduces perception of chronic pain and inflammation",
    color: "text-red-400"
  },
  {
    icon: Waves,
    title: "Emotional Release",
    description: "Facilitates processing of emotions and trauma",
    color: "text-green-400"
  },
  {
    icon: Brain,
    title: "Enhanced Focus",
    description: "Improves concentration and mental clarity",
    color: "text-yellow-400"
  },
  {
    icon: Heart,
    title: "Chakra Balancing",
    description: "Aligns and harmonizes the body's energy centers",
    color: "text-pink-400"
  }
];

// Mock data for sessions
const sessions = [
  {
    title: "Basic Sound Bath",
    price: "$75",
    duration: "60 minutes",
    description: "A gentle introduction to sound healing with Himalayan singing bowls",
    features: [
      "Full-body relaxation",
      "Chakra balancing",
      "Guided meditation",
      "Personalized intention setting"
    ]
  },
  {
    title: "Deep Healing Session",
    price: "$120",
    duration: "90 minutes",
    description: "An intensive session combining multiple sound therapy techniques",
    features: [
      "Crystal bowls therapy",
      "Vocal toning",
      "Energy clearing",
      "Post-session integration"
    ]
  },
  {
    title: "Private Group Session",
    price: "$200",
    duration: "120 minutes",
    description: "Customized sound healing experience for groups of 2-6 people",
    features: [
      "Personalized for group needs",
      "Combination of instruments",
      "Shared intention setting",
      "Take-home practices"
    ]
  }
];

const SoundHealingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-[url('/images/sound-healing-bg.jpg')] bg-cover bg-center before:absolute before:inset-0 before:bg-charcoal/70">
        <div className="container-custom relative z-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mx-auto text-center"
          >
            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-serif text-gold mb-6">
              Sound Healing
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-ivory/90 mb-8 leading-relaxed">
              Experience the transformative power of ancient sound therapy combined with modern wellness practices. 
              Our certified practitioners use authentic Himalayan singing bowls to guide you on a journey of healing and self-discovery.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Book a Session
              </button>
              <button className="btn-outline">
                Learn More
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What is Sound Healing */}
      <section className="section bg-ivory">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="section-title text-charcoal">What is Sound Healing?</h2>
              <p className="text-lg text-charcoal/80 leading-relaxed mb-8">
                Sound healing is an ancient practice that uses vibrational sound to help reduce stress, alter consciousness, 
                and create a deep sense of peace and well-being. The therapeutic application of sound frequencies and music 
                has been used for thousands of years to heal the body, mind, and spirit.
              </p>
              <div className="bg-white rounded-lg p-8 shadow-md">
                <h3 className="text-2xl font-serif text-charcoal mb-4">How It Works</h3>
                <p className="text-charcoal/80 mb-6">
                  Every cell in our body vibrates at specific frequencies. When we're stressed or unwell, these frequencies 
                  can become imbalanced. Sound healing works by introducing pure, therapeutic frequencies that help restore 
                  our natural harmonic balance, promoting healing from within.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Waves className="text-gold" size={24} />
                    </div>
                    <h4 className="font-serif text-charcoal mb-2">Vibrational Resonance</h4>
                    <p className="text-sm text-charcoal/70">Sound waves penetrate deep into tissues, promoting cellular healing</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Brain className="text-gold" size={24} />
                    </div>
                    <h4 className="font-serif text-charcoal mb-2">Brainwave Entrainment</h4>
                    <p className="text-sm text-charcoal/70">Frequencies guide the brain into meditative and healing states</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Heart className="text-gold" size={24} />
                    </div>
                    <h4 className="font-serif text-charcoal mb-2">Nervous System Reset</h4>
                    <p className="text-sm text-charcoal/70">Activates the body's natural relaxation response</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-navy">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <h2 className="section-title text-gold">Proven Benefits of Sound Healing</h2>
            <p className="section-subtitle text-ivory/80">
              Scientific research supports the therapeutic effects of sound healing on both physical and mental well-being
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-navy/50 border border-gold/20 rounded-lg p-6 hover:border-gold/40 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full bg-gold/10 ${benefit.color}`}>
                      <benefit.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif text-ivory mb-3">{benefit.title}</h3>
                      <p className="text-ivory/80">{benefit.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sessions & Programs */}
      <section className="section bg-ivory">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <h2 className="section-title text-charcoal">Our Sound Healing Sessions</h2>
            <p className="section-subtitle">
              Choose from our range of therapeutic sound experiences designed for different needs and preferences
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {sessions.map((session, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-serif text-charcoal">{session.title}</h3>
                      <span className="text-2xl font-serif text-gold">{session.price}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Clock size={16} className="text-gold" />
                      <span className="text-charcoal/70">{session.duration}</span>
                    </div>
                    
                    <p className="text-charcoal/80 mb-6">{session.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      {session.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-gold" />
                          <span className="text-sm text-charcoal/70">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <button className="btn-primary w-full">
                      Book Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="section bg-charcoal">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif text-gold mb-6">
                Ready to Begin Your Healing Journey?
              </h2>
              <p className="text-xl text-ivory/80 mb-8">
                Book your sound healing session today and experience the transformative power of therapeutic sound
              </p>
              
              <div className="bg-navy/50 rounded-lg p-8 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="text-center">
                    <Calendar className="text-gold mx-auto mb-2" size={32} />
                    <h3 className="font-serif text-ivory mb-2">Flexible Scheduling</h3>
                    <p className="text-ivory/70 text-sm">Sessions available 7 days a week, including evenings</p>
                  </div>
                  <div className="text-center">
                    <Users className="text-gold mx-auto mb-2" size={32} />
                    <h3 className="font-serif text-ivory mb-2">Certified Practitioners</h3>
                    <p className="text-ivory/70 text-sm">All sessions led by trained sound healing professionals</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="btn-primary">
                    Schedule Consultation
                  </button>
                  <button className="btn-outline">
                    Call (555) 123-4567
                  </button>
                </div>
              </div>
              
              <p className="text-ivory/60 text-sm">
                New to sound healing? We offer a free 15-minute consultation to help you choose the right session for your needs.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SoundHealingPage;