"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import SEOHelmet from "../../components/seo/SEOHelmet"
import { useSEOData } from "../../hooks/useSEOData"

const PrivacyPolicyPage = () => {
  const { seoData } = useSEOData("/privacy-policy")
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [activeSection, setActiveSection] = useState("")

  const policySections = [
    { id: "introduction", title: "Introduction" },
    { id: "information-we-collect", title: "Information We Collect" },
    { id: "how-we-use-your-information", title: "How We Use Your Information" },
    { id: "sharing-your-information", title: "Sharing Your Information" },
    { id: "data-security", title: "Data Security" },
    { id: "your-rights", title: "Your Rights" },
    { id: "cookies", title: "Cookies and Tracking Technologies" },
    { id: "third-party-links", title: "Third-Party Links" },
    { id: "childrens-privacy", title: "Children's Privacy" },
    { id: "changes-to-this-policy", title: "Changes to This Policy" },
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
    title: "Privacy Policy | OMSound Nepal",
    description: "Understand how OMSound Nepal collects, uses, and protects your personal information.",
    keywords: ["privacy policy", "data protection", "OMSound Nepal privacy", "user data"],
    ogImage: "/images/privacy-hero.jpg",
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
        url="https://omsoundnepal.com/privacy-policy"
      />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-pulse" />
        <div className="container-custom relative z-10">
          <h1 className="text-6xl md:text-8xl font-serif mb-6 bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-xl md:text-2xl text-ivory/80 max-w-3xl mx-auto">
            Your trust is our priority. Learn how we protect your personal information.
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
            <h2 className="text-4xl font-serif text-gold mb-6">1. Introduction</h2>
            <p>
              Welcome to OMSound Nepal's Privacy Policy. We are committed to protecting your personal information and
              your right to privacy. If you have any questions or concerns about this privacy policy, or our practices
              with regard to your personal information, please contact us at info@omsoundnepal.com.
            </p>
            <p className="mt-4">
              This privacy policy applies to all information collected through our website (such as
              https://omsoundnepal.com), and/or any related services, sales, marketing or events (we refer to them
              collectively in this privacy policy as the "Services").
            </p>
          </motion.section>

          <motion.section
            id="information-we-collect"
            ref={(el: HTMLDivElement | null) => (sectionRefs.current["information-we-collect"] = el)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl font-serif text-gold mb-6">2. Information We Collect</h2>
            <p>
              We collect personal information that you voluntarily provide to us when you register on the Services,
              express an interest in obtaining information about us or our products and Services, when you participate
              in activities on the Services or otherwise when you contact us.
            </p>
            <h3 className="text-2xl font-semibold text-gold mt-6 mb-4">Personal Information Provided by You</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Name and Contact Data:</strong> We collect your first and last name, email address, postal
                address, phone number, and other similar contact data.
              </li>
              <li>
                <strong>Credentials:</strong> We collect passwords, password hints, and similar security information
                used for authentication and account access.
              </li>
              <li>
                <strong>Payment Data:</strong> We collect data necessary to process your payment if you make purchases,
                such as your payment instrument number (such as a credit card number), and the security code associated
                with your payment instrument. All payment data is stored by our payment processor and you should review
                its privacy policies and contact the payment processor directly to respond to your questions.
              </li>
              <li>
                <strong>Order Data:</strong> Information related to your purchases, including product details, order
                history, and shipping information.
              </li>
            </ul>
          </motion.section>

          <motion.section
            id="how-we-use-your-information"
            ref={(el: HTMLDivElement | null) => (sectionRefs.current["how-we-use-your-information"] = el)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl font-serif text-gold mb-6">3. How We Use Your Information</h2>
            <p>
              We use personal information collected via our Services for a variety of business purposes described below.
              We process your personal information for these purposes in reliance on our legitimate business interests,
              in order to enter into or perform a contract with you, with your consent, and/or for compliance with our
              legal obligations.
            </p>
            <h3 className="text-2xl font-semibold text-gold mt-6 mb-4">
              We use the information we collect or receive:
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>To facilitate account creation and logon process.</li>
              <li>To send you marketing and promotional communications.</li>
              <li>To send administrative information to you.</li>
              <li>To fulfill and manage your orders.</li>
              <li>To post testimonials.</li>
              <li>To deliver targeted advertising to you.</li>
              <li>To request feedback.</li>
              <li>To protect our Services.</li>
              <li>To respond to user inquiries/offer support to users.</li>
              <li>To enable user-to-user communications.</li>
              <li>To manage user accounts.</li>
              <li>For other business purposes.</li>
            </ul>
          </motion.section>

          <motion.section
            id="sharing-your-information"
            ref={(el: HTMLDivElement | null) => (sectionRefs.current["sharing-your-information"] = el)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl font-serif text-gold mb-6">4. Sharing Your Information</h2>
            <p>
              We only share information with your consent, to comply with laws, to provide you with services, to protect
              your rights, or to fulfill business obligations.
            </p>
            <p className="mt-4">We may process or share your data that we hold based on the following legal basis:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Consent:</strong> We may process your data if you have given us specific consent to use your
                personal information for a specific purpose.
              </li>
              <li>
                <strong>Legitimate Interests:</strong> We may process your data when it is reasonably necessary to
                achieve our legitimate business interests.
              </li>
              <li>
                <strong>Performance of a Contract:</strong> Where we have entered into a contract with you, we may
                process your personal information to fulfill the terms of our contract.
              </li>
              <li>
                <strong>Legal Obligations:</strong> We may disclose your information where we are legally required to do
                so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or
                legal process.
              </li>
              <li>
                <strong>Vital Interests:</strong> We may disclose your information where we believe it is necessary to
                investigate, prevent, or take action regarding potential violations of our policies, suspected fraud,
                situations involving potential threats to the safety of any person and illegal activities, or as
                evidence in litigation in which we are involved.
              </li>
            </ul>
          </motion.section>

          <motion.section
            id="data-security"
            ref={(el: HTMLDivElement | null) => (sectionRefs.current["data-security"] = el)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl font-serif text-gold mb-6">5. Data Security</h2>
            <p>
              We have implemented appropriate technical and organizational security measures designed to protect the
              security of any personal information we process. However, please also remember that we cannot guarantee
              that the internet itself is 100% secure. Although we will do our best to protect your personal
              information, transmission of personal information to and from our Services is at your own risk. You should
              only access the Services within a secure environment.
            </p>
          </motion.section>

          <motion.section
            id="your-rights"
            ref={(el: HTMLDivElement | null) => (sectionRefs.current["your-rights"] = el)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl font-serif text-gold mb-6">6. Your Rights</h2>
            <p>
              In some regions (like the European Economic Area), you have certain rights under applicable data
              protection laws. These may include the right (i) to request access and obtain a copy of your personal
              information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal
              information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the
              right to object to the processing of your personal information. To make such a request, please use the
              contact details provided below.
            </p>
          </motion.section>

          <motion.section
            id="cookies"
            ref={(el: HTMLDivElement | null) => (sectionRefs.current["cookies"] = el)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl font-serif text-gold mb-6">7. Cookies and Tracking Technologies</h2>
            <p>
              We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store
              information. Specific information about how we use such technologies and how you can refuse certain
              cookies is set out in our Cookie Policy.
            </p>
          </motion.section>

          <motion.section
            id="third-party-links"
            ref={(el: HTMLDivElement | null) => (sectionRefs.current["third-party-links"] = el)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl font-serif text-gold mb-6">8. Third-Party Links</h2>
            <p>
              The Services may contain links to third-party websites or services that are not owned or controlled by
              OMSound Nepal. We are not responsible for the privacy practices or the content of such third-party
              websites or services. We encourage you to review the privacy policies of any third-party websites or
              services you visit.
            </p>
          </motion.section>

          <motion.section
            id="childrens-privacy"
            ref={(el: HTMLDivElement | null) => (sectionRefs.current["childrens-privacy"] = el)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl font-serif text-gold mb-6">9. Children's Privacy</h2>
            <p>
              Our Services are not intended for children under the age of 13. We do not knowingly collect personal
              information from children under 13. If you are a parent or guardian and you learn that your child has
              provided us with personal information, please contact us. If we become aware that we have collected
              personal information from a child under age 13 without verification of parental consent, we take steps to
              remove that information from our servers.
            </p>
          </motion.section>

          <motion.section
            id="changes-to-this-policy"
            ref={(el: HTMLDivElement | null) => (sectionRefs.current["changes-to-this-policy"] = el)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl font-serif text-gold mb-6">10. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. The updated version will be indicated by an updated
              "Revised" date and the updated version will be effective as soon as it is accessible. If we make material
              changes to this privacy policy, we may notify you either by prominently posting a notice of such changes
              or by directly sending you a notification. We encourage you to review this privacy policy frequently to be
              informed of how we are protecting your information.
            </p>
          </motion.section>

          <motion.section
            id="contact-us"
            ref={(el: HTMLDivElement | null) => (sectionRefs.current["contact-us"] = el)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl font-serif text-gold mb-6">11. Contact Us</h2>
            <p>
              If you have questions or comments about this policy, you may email us at info@omsoundnepal.com or by post
              to:
            </p>
            <address className="not-italic mt-4">
              OMSound Nepal
              <br />
              Sanepa
              <br />
              Lalitpur, Nepal
            </address>
          </motion.section>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage
