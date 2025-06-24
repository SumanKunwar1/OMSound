import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Product } from '../../data/products';
import LoginModal from '../auth/LoginModal';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    
    addToCart(product, 1);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    
    addToCart(product, 1);
    window.location.href = '/cart';
  };

  const handleLoginSuccess = () => {
    // After successful login, add the product to cart
    addToCart(product, 1);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={14}
        className={`${
          index < Math.floor(rating)
            ? 'text-gold fill-gold'
            : index < rating
            ? 'text-gold fill-gold opacity-50'
            : 'text-gold/30'
        }`}
      />
    ));
  };

  return (
    <>
      <Link 
        to={`/product/${product.id}`}
        className="block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="bg-navy/20 rounded-lg overflow-hidden transition-transform duration-300 hover:shadow-lg">
          <div className="relative">
            <div className="aspect-square overflow-hidden">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            
            {!product.inStock && (
              <div className="absolute top-4 right-4 bg-charcoal/80 text-ivory py-1 px-3 text-xs font-semibold rounded">
                Out of Stock
              </div>
            )}
          </div>
          
          <div className="p-5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-serif text-lg text-ivory">{product.name}</h3>
              <span className="font-medium text-gold">${product.price}</span>
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {renderStars(product.rating)}
              </div>
              <span className="text-ivory/70 text-sm">
                {product.rating.toFixed(1)} ({product.reviewCount})
              </span>
            </div>
            
            <div className="flex gap-2 mb-3">
              <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded">
                {product.size}
              </span>
              <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded">
                {product.musicalNote}
              </span>
              <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded">
                {product.type}
              </span>
            </div>
            
            <p className="text-ivory/70 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
            
            <div className={`flex gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-2 flex items-center justify-center gap-2 rounded 
                  ${product.inStock 
                    ? 'bg-gold/20 text-gold hover:bg-gold hover:text-charcoal' 
                    : 'bg-charcoal/50 text-ivory/50 cursor-not-allowed'} 
                  transition-colors`}
              >
                <ShoppingCart size={16} />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className={`flex-1 py-2 rounded
                  ${product.inStock 
                    ? 'bg-gold text-charcoal hover:bg-opacity-90' 
                    : 'bg-charcoal/50 text-ivory/50 cursor-not-allowed'} 
                  transition-colors`}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </Link>

      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default ProductCard;