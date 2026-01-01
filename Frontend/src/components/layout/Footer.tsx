import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Pointer as Pinterest, Mail, Phone, MapPin, ChevronRight, Send } from 'lucide-react';
import { useState } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed with:", email);
    setEmail("");
  };

  return (
    <footer className="bg-navy-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="mb-4">
              <span className="text-2xl font-bold text-gold-500 font-serif">OMSound</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Engineered in the heart of Nepal, our waterproofing solutions combine proven expertise with modern technology to safeguard your spaces against water and moisture.
            </p>

            {/* Newsletter Subscription */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 text-gold-400">
                Newsletter Signup
              </h3>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex h-9 w-full rounded-md border border-gray-600 bg-navy-800 px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-500 disabled:cursor-not-allowed disabled:opacity-50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center h-9 px-4 py-2 bg-gold-500 hover:bg-gold-600 text-navy-900 font-medium rounded-md transition-colors"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold-400">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-gold-400 flex items-center transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-gold-500" />
                  About Trinity
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-gray-400 hover:text-gold-400 flex items-center transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-gold-500" />
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/press"
                  className="text-gray-400 hover:text-gold-400 flex items-center transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-gold-500" />
                  Press & Media
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-400 hover:text-gold-400 flex items-center transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-gold-500" />
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold-400">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/faq"
                  className="text-gray-400 hover:text-gold-400 flex items-center transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-gold-500" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/care-guide"
                  className="text-gray-400 hover:text-gold-400 flex items-center transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-gold-500" />
                  Waterproofing Care Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="text-gray-400 hover:text-gold-400 flex items-center transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-gold-500" />
                  Support Center
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-gray-400 hover:text-gold-400 flex items-center transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-gold-500" />
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-400 hover:text-gold-400 flex items-center transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-gold-500" />
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold-400">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-2 text-gold-500" />
                <span>info@trinitywaterproofing.com.np</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-2 text-gold-500" />
                <span>+977 985-1042257</span>
              </li>
              <li className="flex items-center text-gray-400">
                <MapPin className="h-5 w-5 mr-2 text-gold-500" />
                <span>Maharajgunj, Kathmandu</span>
              </li>
            </ul>

            {/* Social Media Icons */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 text-gold-400">Follow Us</h3>
              <div className="flex space-x-3">
                <a
                  href="https://facebook.com"
                  className="bg-navy-600 hover:bg-navy-500 p-2 rounded-full transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  className="bg-navy-600 hover:bg-navy-500 p-2 rounded-full transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://pinterest.com"
                  className="bg-navy-600 hover:bg-navy-500 p-2 rounded-full transition-colors"
                  aria-label="Pinterest"
                >
                  <Pinterest className="h-5 w-5" />
                </a>
                <a
                  href="https://youtube.com"
                  className="bg-navy-600 hover:bg-navy-500 p-2 rounded-full transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-navy-600 mt-12 pt-8">
          <div className="flex flex-col items-center">
            <p className="text-gray-400 font-serif italic mb-2">
              "Protecting what matters most, one drop at a time."
            </p>
            <p className="text-gray-500 text-sm">
              © {currentYear} Trinity Waterproofing. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;