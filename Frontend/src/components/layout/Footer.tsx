import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Pointer as Pinterest } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gold-500 text-navy-500 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Column */}
          <div>
            <h4 className="text-navy-700 font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-navy-600 hover:text-navy-800 transition-colors">
                  About OMSound
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-navy-600 hover:text-navy-800 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-navy-600 hover:text-navy-800 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-navy-600 hover:text-navy-800 transition-colors">
                  Press & Media
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-navy-700 font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-navy-600 hover:text-navy-800 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-navy-600 hover:text-navy-800 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/care-guide" className="text-navy-600 hover:text-navy-800 transition-colors">
                  Sound Bowl Care Guide
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-navy-600 hover:text-navy-800 transition-colors">
                  Support Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-navy-700 font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-navy-600 hover:text-navy-800 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-navy-600 hover:text-navy-800 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-navy-600 hover:text-navy-800 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-navy-600 hover:text-navy-800 transition-colors">
                  Refund & Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="text-navy-700 font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4 mb-6">
              <a href="https://instagram.com" className="text-navy-600 hover:text-navy-800 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" className="text-navy-600 hover:text-navy-800 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://pinterest.com" className="text-navy-600 hover:text-navy-800 transition-colors" aria-label="Pinterest">
                <Pinterest size={20} />
              </a>
              <a href="https://youtube.com" className="text-navy-600 hover:text-navy-800 transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
            <form className="space-y-3">
              <label htmlFor="newsletter" className="block text-navy-700 font-medium">
                Newsletter Signup
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  id="newsletter"
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-2 bg-navy-100 border border-navy-300 text-navy-800 rounded focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                />
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-navy-600 text-gold-200 hover:bg-navy-700 transition-colors rounded"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-navy-300 pt-8 text-center">
          <p className="text-navy-600 font-serif italic mb-4">
            Crafted in the Heart of the Himalayas
          </p>
          <p className="text-navy-500 text-sm">
            © {currentYear} OMSound Nepal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;