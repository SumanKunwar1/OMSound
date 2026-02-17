import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-shadow duration-300 ${
        isScrolled ? 'shadow-lg shadow-black/20' : ''
      }`}
      // Always fully solid navy — never transparent, never blurred
      style={{ backgroundColor: '#0a1628', borderBottom: '1px solid rgba(212,175,55,0.25)' }}
    >
      <div className="container-custom py-4 md:py-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-gold transition-colors duration-300">
            Trinity Waterproofing
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium text-ivory hover:text-gold transition-colors duration-300">
            Home
          </Link>
          <Link to="/shop" className="font-medium text-ivory hover:text-gold transition-colors duration-300">
            Shop
          </Link>
          <Link to="/about" className="font-medium text-ivory hover:text-gold transition-colors duration-300">
            Our Story
          </Link>
          <Link to="/services" className="font-medium text-ivory hover:text-gold transition-colors duration-300">
            Services
          </Link>
          <Link to="/contact" className="font-medium text-ivory hover:text-gold transition-colors duration-300">
            Contact Us
          </Link>

          {/* Auth + Cart */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-ivory hover:text-gold transition-colors">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="text-ivory hover:text-gold transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-ivory hover:text-gold transition-colors">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 border-2 border-gold text-gold hover:bg-gold hover:text-navy transition-colors rounded-md font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}

            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-ivory hover:text-gold transition-colors duration-300" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-navy text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </nav>

        {/* Mobile: Cart + Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-ivory" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-navy text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none text-ivory"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown — also fully solid */}
      {isMenuOpen && (
        <div
          className="md:hidden border-t w-full"
          style={{
            backgroundColor: '#0a1628',
            borderColor: 'rgba(212,175,55,0.2)',
          }}
        >
          <div className="container-custom py-4 flex flex-col space-y-1">
            {[
              { label: 'Home',       href: '/'        },
              { label: 'Shop',       href: '/shop'    },
              { label: 'Our Story',  href: '/about'   },
              { label: 'Services',   href: '/services' },
              { label: 'Contact Us', href: '/contact' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                to={href}
                className="text-ivory font-medium py-3 px-2 hover:text-gold hover:bg-white/5 rounded-lg transition-colors"
              >
                {label}
              </Link>
            ))}

            <div
              className="flex flex-col space-y-2 pt-4 mt-2"
              style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
            >
              {user ? (
                <>
                  <Link to="/dashboard" className="text-ivory hover:text-gold transition-colors py-3 px-2 rounded-lg hover:bg-white/5">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-ivory hover:text-gold transition-colors py-3 px-2 text-left rounded-lg hover:bg-white/5"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-ivory hover:text-gold transition-colors py-3 px-2 rounded-lg hover:bg-white/5">
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-3 border-2 border-gold text-gold hover:bg-gold hover:text-navy transition-colors rounded-md text-center font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;