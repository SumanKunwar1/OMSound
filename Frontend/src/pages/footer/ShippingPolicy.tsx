"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import SEOHelmet from "../../components/seo/SEOHelmet"
import { useSEOData } from "../../hooks/useSEOData"
import { Package, Globe, Truck, MapPin } from "lucide-react"

const ShippingPolicyPage = () => {
  const { seoData } = useSEOData("/shipping-policy")
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [activeSection, setActiveSection] = useState("")

  const policySections = [
    { id: "introduction", title: "Introduction" },
    { id: "processing-time", title: "Order Processing Time" },
    { id: "domestic-shipping", title: "Domestic Shipping" },
    { id: "international-shipping", title: "International Shipping" },
    { id: "customs-duties", title: "Customs, Duties & Taxes" },
    { id: "tracking-orders", title: "Tracking Your Order" },
    { id: "shipping-address", title: "Shipping Address Accuracy" },
    { id: "damaged-lost", title: "Damaged or Lost Packages" },
    { id: "returns-refunds", title: "Returns & Refunds" },
    { id: "contact-us", title: "Contact Us" },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-50% 0px -50% 0px" }, // Adjust this to control when a section becomes active
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = sectionRefs.current[id]
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const defaultSEO = {
    title: "Shipping Policy - OMSound Nepal",
    description: "Learn about our shipping methods, delivery times, and international shipping details.",
    keywords: ["shipping policy", "delivery", "international shipping", "order tracking"],
    ogImage: "/images/shipping-hero.jpg",
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
        url="https://omsoundnepal.com/shipping-policy"
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
            Shipping Policy
          </h1>
          <p className="text-xl md:text-2xl text-ivory/80 max-w-3xl mx-auto">
            Ensuring your sacred bowls arrive safely and swiftly, wherever you are.
          </p>
        </div>
      </motion.div>

      {/* Policy Content */}
      <div className="container-custom py-16 grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sticky Table of Contents */}
        <motion.nav
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-1 sticky top-32 h-fit bg-navy/50 backdrop-blur-sm rounded-lg p-6 border border-gold/20 shadow-lg"
        >
          <h3 className="text-xl font-semibold text-gold mb-6">Table of Contents</h3>
          <ul className="space-y-3">
            {policySections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(section.id)
                  }}
                  className={`block text-lg py-2 px-4 rounded-md transition-colors duration-200 ${
                    activeSection === section.id
                      ? "bg-gold text-navy font-bold"
                      : "text-ivory/80 hover:bg-white/10 hover:text-ivory"
                  }`}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>

        {/* Policy Text */}
        <div className="lg:col-span-3 space-y-10 text-ivory/80 leading-relaxed text-lg">
          <motion.section
            id="introduction"
            ref={(el: HTMLDivElement | null) => (sectionRefs.current["introduction"] = el)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl font-serif text-gold mb-6 flex items-center gap-3">
              <Package className="w-8 h-8" /> 1. Introduction
            </h2>
            <p>
              At OMSound Nepal, we are dedicated to ensuring your authentic Himalayan singing bowls and other products
              reach you safely and efficiently. This Shipping Policy outlines our shipping procedures, delivery times,
              and related information. By placing an order with us, you agree to the terms outlined below.
            </p>
          </motion.section>

          <motion.section
            id="processing-time"
            ref={(el: HTMLDivElement | null) => (sectionRefs.current["processing-time"] = el)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl font-serif text-gold mb-6 flex items-center gap-3">
              <Truck className="w-8 h-8" /> 2. Order Processing Time
            </h2>
            <p>
              All orders are processed within <strong>1-3 business days</strong> (excluding weekends and holidays) after
              receiving your order confirmation email. You will receive another notification when your order has
              shipped.
            </p>
            <p className="mt-4">
              Please note that during peak seasons or promotional periods, processing times may be slightly longer. We
              appreciate your patience.
            </p>
          </motion.section>

          <motion.section
            id="domestic-shipping"
            ref={(el: HTMLDivElement | null) => (sectionRefs.current["domestic-shipping"] = el)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl font-serif text-gold mb-6 flex items-center gap-3">
              <MapPin className="w-8 h-8" /> 3. Domestic Shipping (Within Nepal)
            </h2>
            <p>For deliveries within Nepal, we offer standard and express shipping options.</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>
                <strong>Standard Shipping:</strong> 3-5 business days. Free for all orders.
              </li>
              <li>
                <strong>Express Shipping:</strong> 1-2 business days. Additional charges apply, calculated at checkout.
              </li>
            </ul>
          </motion.section>

          <motion.section
            id="international-shipping"
            ref={(el: HTMLDivElement | null) => (sectionRefs.current["international-shipping"] = el)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl font-serif text-gold mb-6 flex items-center gap-3">
              <Globe className="w-8 h-8" /> 4. International Shipping
            </h2>
            <p>
              We are proud to offer free worldwide shipping on all international orders over <strong>$100 USD</strong>.
              For orders below this amount, shipping costs will be calculated at checkout based on weight and
              destination.
            </p>
            <p className="mt-4">Estimated international delivery times:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>
                <strong>North America:</strong> 7-14 business days
              </li>
              <li>
                <strong>Europe:</strong> 7-14 business days
              </li>
              <li>
                <strong>Asia & Australia:</strong> 5-10 business days
              </li>
              <li>
                <strong>Rest of World:</strong> 10-20 business days
              </li>
            </ul>
            <p className="mt-4">
              These are estimated delivery times. Actual delivery times may vary due to customs processing, local postal
              services, and unforeseen circumstances.
            </p>
          </motion.section>

          <motion.section
            id="customs-duties"
            ref={(el: HTMLDivElement | null) => (sectionRefs.current["customs-duties"] = el)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl font-serif text-gold mb-6">5. Customs, Duties & Taxes</h2>
            <p>
              OMSound Nepal is not responsible for any customs and taxes applied to your order. All fees imposed during
              or after shipping are the responsibility of the customer (tariffs, taxes, etc.).
            </p>
            <p className="mt-4">
              We recommend checking with your local customs office for more information on potential charges before
              placing your order.
            </p>
          </motion.section>

          <motion.section
            id="tracking-orders"
            ref={(el: HTMLDivElement | null) => (sectionRefs.current["tracking-orders"] = el)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl font-serif text-gold mb-6">6. Tracking Your Order</h2>
            <p>
              Once your order has shipped, you will receive an email notification from us which will include a tracking
              number you can use to check its status. Please allow 48 hours for the tracking information to become
              available.
            </p>
            <p className="mt-4">
              If you haven't received your order within {`X`} days of receiving your shipping confirmation email, please
              contact us at info@omsoundnepal.com with your name and order number, and we will look into it for you.
            </p>
          </motion.section>

          <motion.section
            id="shipping-address"
            ref={(el: HTMLDivElement | null) => (sectionRefs.current["shipping-address"] = el)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl font-serif text-gold mb-6">7. Shipping Address Accuracy</h2>
            <p>
              Please ensure your shipping address is accurate and complete at the time of checkout. We are not
              responsible for orders shipped to incorrectly provided addresses. If an order is returned to us due to an
              incorrect address, additional shipping fees may apply for re-shipment.
            </p>
          </motion.section>

          <motion.section
            id="damaged-lost"
            ref={(el: HTMLDivElement | null) => (sectionRefs.current["damaged-lost"] = el)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl font-serif text-gold mb-6">8. Damaged or Lost Packages</h2>
            <p>
              OMSound Nepal takes great care in packaging your items securely. In the unfortunate event that your order
              arrives damaged, please contact us immediately with photos of the damage and packaging. We will work with
              you to resolve the issue promptly.
            </p>
            <p className="mt-4">
              If a package is lost in transit, please contact us after the estimated delivery window has passed. We will
              initiate an investigation with the shipping carrier.
            </p>
          </motion.section>

          <motion.section
            id="returns-refunds"
            ref={(el: HTMLDivElement | null) => (sectionRefs.current["returns-refunds"] = el)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl font-serif text-gold mb-6">9. Returns & Refunds</h2>
            <p>
              For information on returns and refunds, please refer to our dedicated{" "}
              <a href="/returns-policy" className="text-gold hover:underline">
                Returns Policy
              </a>{" "}
              page.
            </p>
          </motion.section>

          <motion.section
            id="contact-us"
            ref={(el: HTMLDivElement | null) => (sectionRefs.current["contact-us"] = el)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl font-serif text-gold mb-6">10. Contact Us</h2>
            <p>If you have any questions about our Shipping Policy, please contact us:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Email: info@omsoundnepal.com</li>
              <li>Phone: +977 1234 5678</li>
            </ul>
          </motion.section>
        </div>
      </div>
    </div>
  )
}

export default ShippingPolicyPage
