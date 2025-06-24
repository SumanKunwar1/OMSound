import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react';
import SEOHelmet from '../components/seo/SEOHelmet';
import { seoData } from '../data/seoData';
import AnimatedSection from '../components/utils/AnimatedSection';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const seo = seoData.contact;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
    
    // Show success message (in a real app, you'd handle this properly)
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Workshop",
      details: ["Sanepa, Lalitpur", "Kathmandu Valley, Nepal"],
      extra: "Open Monday-Friday, 10am-6pm NPT"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+977 1234 5678"],
      extra: "Available 9am-5pm (GMT+5:45)"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@omsoundnepal.com"],
      extra: "We typically respond within 24 hours"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 10am-6pm", "Sat: 10am-4pm", "Sun: Closed"],
      extra: "Nepal Standard Time (GMT+5:45)"
    }
  ];

  const subjects = [
    "General Inquiry",
    "Product Information",
    "Custom Orders",
    "Wholesale Inquiries",
    "Sound Healing Sessions",
    "Shipping & Returns",
    "Technical Support",
    "Partnership Opportunities"
  ];

  return (
    <div className="min-h-screen pt-24 bg-ivory">
      <SEOHelmet
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        image={seo.image}
        type={seo.type}
        structuredData={seo.structuredData}
        url="https://omsoundnepal.com/contact"
      />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-navy to-navy/90">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.pexels.com/photos/5993553/pexels-photo-5993553.jpeg" 
            alt="Contact background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom relative z-10">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-serif text-gold mb-6">Get in Touch</h1>
              <p className="text-xl text-ivory/90 leading-relaxed">
                Have questions about our singing bowls, sound healing sessions, or custom orders? 
                We're here to help you find the perfect resonance for your journey.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section bg-ivory">
        <div className="container-custom">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 text-gold rounded-full mb-4">
                    <info.icon size={24} />
                  </div>
                  <h3 className="font-serif text-lg text-charcoal mb-3">{info.title}</h3>
                  <div className="space-y-1 mb-3">
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-charcoal/80">{detail}</p>
                    ))}
                  </div>
                  <p className="text-charcoal/60 text-sm">{info.extra}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section bg-navy">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <AnimatedSection>
              <div className="bg-navy/50 rounded-lg p-8 border border-gold/20">
                <h2 className="text-2xl font-serif text-gold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-ivory mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-navy border border-gold/30 rounded-md text-ivory placeholder-ivory/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-ivory mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-navy border border-gold/30 rounded-md text-ivory placeholder-ivory/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-ivory mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-navy border border-gold/30 rounded-md text-ivory focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((subject, index) => (
                        <option key={index} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-ivory mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-navy border border-gold/30 rounded-md text-ivory placeholder-ivory/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-vertical"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-charcoal mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gold/20">
                  <p className="text-ivory/70 text-sm mb-4">
                    Prefer to reach out directly? You can also:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href="tel:+97712345678" 
                      className="flex items-center text-gold hover:text-gold/80 transition-colors"
                    >
                      <Phone size={16} className="mr-2" />
                      Call us directly
                    </a>
                    <a 
                      href="mailto:info@omsoundnepal.com" 
                      className="flex items-center text-gold hover:text-gold/80 transition-colors"
                    >
                      <Mail size={16} className="mr-2" />
                      Send an email
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Map & Additional Info */}
            <AnimatedSection delay={0.2}>
              <div className="space-y-6">
                {/* Map Placeholder */}
                <div className="bg-navy/30 rounded-lg p-8 border border-gold/20 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="text-gold mx-auto mb-4" size={48} />
                    <h3 className="font-serif text-ivory mb-2">Our Workshop Location</h3>
                    <p className="text-ivory/70 mb-4">
                      Sanepa, Lalitpur<br />
                      Kathmandu Valley, Nepal
                    </p>
                    <button className="text-gold hover:text-gold/80 transition-colors underline">
                      View on Google Maps
                    </button>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-navy/30 rounded-lg p-6 border border-gold/20">
                  <h3 className="font-serif text-ivory mb-4">Connect With Us</h3>
                  <p className="text-ivory/70 mb-4 text-sm">
                    Follow our journey and see behind-the-scenes content from our workshop
                  </p>
                  <div className="flex gap-4">
                    <a 
                      href="https://instagram.com" 
                      className="p-3 bg-gold/10 text-gold rounded-full hover:bg-gold/20 transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram size={20} />
                    </a>
                    <a 
                      href="https://facebook.com" 
                      className="p-3 bg-gold/10 text-gold rounded-full hover:bg-gold/20 transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook size={20} />
                    </a>
                    <a 
                      href="https://youtube.com" 
                      className="p-3 bg-gold/10 text-gold rounded-full hover:bg-gold/20 transition-colors"
                      aria-label="YouTube"
                    >
                      <Youtube size={20} />
                    </a>
                  </div>
                </div>

                {/* FAQ Quick Links */}
                <div className="bg-navy/30 rounded-lg p-6 border border-gold/20">
                  <h3 className="font-serif text-ivory mb-4">Quick Help</h3>
                  <div className="space-y-3">
                    <a href="/faq" className="flex items-center text-ivory/80 hover:text-gold transition-colors">
                      <MessageCircle size={16} className="mr-2" />
                      Frequently Asked Questions
                    </a>
                    <a href="/shipping" className="flex items-center text-ivory/80 hover:text-gold transition-colors">
                      <MessageCircle size={16} className="mr-2" />
                      Shipping & Returns
                    </a>
                    <a href="/care-guide" className="flex items-center text-ivory/80 hover:text-gold transition-colors">
                      <MessageCircle size={16} className="mr-2" />
                      Bowl Care Guide
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section bg-ivory">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-serif text-charcoal mb-4">Stay Connected</h2>
              <p className="text-charcoal/80 mb-6">
                Subscribe to our newsletter for updates on new products, sound healing tips, and exclusive offers.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-charcoal/20 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;