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
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Always use navy background with proper visibility
  const getNavbarClasses = () => {
    if (isScrolled || isMenuOpen) {
      return 'bg-navy/95 backdrop-blur-sm shadow-lg';
    }
    
    // Changed from transparent to semi-transparent navy for initial visibility
    return 'bg-navy/90 backdrop-blur-sm';
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${getNavbarClasses()}`}>
      <div className="container-custom py-4 md:py-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-gold transition-colors duration-300">
            Trinity Waterproofing
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className="font-medium text-ivory hover:text-gold transition-colors duration-300"
          >
            Home
          </Link>
          <Link 
            to="/shop" 
            className="font-medium text-ivory hover:text-gold transition-colors duration-300"
          >
            Shop
          </Link>
          <Link 
            to="/about" 
            className="font-medium text-ivory hover:text-gold transition-colors duration-300"
          >
            Our Story
          </Link>
          <Link 
            to="/services" 
            className="font-medium text-ivory hover:text-gold transition-colors duration-300"
          >
            Services
          </Link>
          <Link 
            to="/contact" 
            className="font-medium text-ivory hover:text-gold transition-colors duration-300"
          >
            Contact Us
          </Link>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard"
                  className="text-ivory hover:text-gold transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-ivory hover:text-gold transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="text-ivory hover:text-gold transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/signup"
                  className="px-4 py-2 border-2 border-gold text-gold hover:bg-gold hover:text-navy transition-colors rounded-md"
                >
                  Sign Up
                </Link>
              </>
            )}
            <Link to="/cart" className="relative">
              <ShoppingCart 
                className="w-6 h-6 text-ivory hover:text-gold transition-colors duration-300" 
              />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-navy text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Link to="/cart" className="relative mr-4">
            <ShoppingCart 
              className="w-6 h-6 text-ivory transition-colors duration-300" 
            />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-navy text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none text-ivory"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-navy/95 backdrop-blur-sm shadow-lg border-t border-ivory/20">
            <div className="container-custom py-4 flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-ivory font-medium py-2 hover:text-gold transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/shop" 
                className="text-ivory font-medium py-2 hover:text-gold transition-colors"
              >
                Shop
              </Link>
              <Link 
                to="/about" 
                className="text-ivory font-medium py-2 hover:text-gold transition-colors"
              >
                Our Story
              </Link>
              <Link 
                to="/sound-healing" 
                className="text-ivory font-medium py-2 hover:text-gold transition-colors"
              >
                Sound Healing
              </Link>
              <Link 
                to="/contact" 
                className="text-ivory font-medium py-2 hover:text-gold transition-colors"
              >
                Contact Us
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-ivory/10">
                {user ? (
                  <>
                    <Link 
                      to="/dashboard"
                      className="text-ivory hover:text-gold transition-colors py-2"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-ivory hover:text-gold transition-colors py-2 text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login"
                      className="text-ivory hover:text-gold transition-colors py-2"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup"
                      className="px-4 py-2 border-2 border-gold text-gold hover:bg-gold hover:text-navy transition-colors rounded-md text-center"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;