import { Link } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import SEOHelmet from '../components/seo/SEOHelmet';
import { seoData } from '../data/seoData';
import { useCart } from '../context/CartContext';
import CartSummary from '../components/shop/CartSummary';
import AnimatedSection from '../components/utils/AnimatedSection';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const seo = seoData.cart;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-24 bg-ivory">
        <SEOHelmet
          title={seo.title}
          description={seo.description}
          keywords={seo.keywords}
          type={seo.type}
          noindex={seo.noindex}
          url="https://omsoundnepal.com/cart"
        />
        <div className="container-custom py-16 text-center">
          <AnimatedSection>
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
              <ShoppingBag size={48} className="mx-auto text-gold/50 mb-4" />
              <h1 className="font-serif text-2xl text-charcoal mb-4">Your Cart is Empty</h1>
              <p className="text-charcoal/70 mb-8">
                Looks like you haven't added any singing bowls to your cart yet.
              </p>
              <Link to="/shop" className="btn-primary">
                Browse Our Collection
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-ivory">
      <SEOHelmet
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        type={seo.type}
        noindex={seo.noindex}
        url="https://omsoundnepal.com/cart"
      />

      <div className="container-custom py-16">
        <AnimatedSection>
          <h1 className="font-serif text-3xl text-charcoal mb-2">Your Cart</h1>
          <p className="text-charcoal/70 mb-8">
            Review your items before proceeding to checkout
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <AnimatedSection>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-charcoal/10">
                  <div className="hidden md:flex text-charcoal/70 text-sm">
                    <div className="w-1/2">Product</div>
                    <div className="w-1/6 text-center">Price</div>
                    <div className="w-1/6 text-center">Quantity</div>
                    <div className="w-1/6 text-center">Total</div>
                  </div>
                </div>
                
                <div>
                  {cart.map((item, index) => (
                    <div 
                      key={item.product.id}
                      className={`p-6 ${
                        index < cart.length - 1 ? 'border-b border-charcoal/10' : ''
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center">
                        {/* Product Info */}
                        <div className="flex items-center w-full md:w-1/2 mb-4 md:mb-0">
                          <div className="relative w-20 h-20 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={item.product.image} 
                              alt={item.product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <Link 
                              to={`/product/${item.product.id}`} 
                              className="font-serif text-lg text-charcoal hover:text-gold transition-colors"
                            >
                              {item.product.name}
                            </Link>
                            <div className="flex flex-wrap gap-2 mt-1">
                              <span className="text-xs bg-gold/10 text-gold/80 px-2 py-0.5 rounded">
                                {item.product.size}
                              </span>
                              <span className="text-xs bg-gold/10 text-gold/80 px-2 py-0.5 rounded">
                                {item.product.tone}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Price - Mobile hidden, desktop visible */}
                        <div className="hidden md:block w-1/6 text-center">
                          <span className="text-charcoal">${item.product.price.toFixed(2)}</span>
                        </div>
                        
                        {/* Quantity Control */}
                        <div className="flex justify-between items-center w-full md:w-1/6 md:justify-center">
                          <div className="md:hidden text-charcoal">
                            ${item.product.price.toFixed(2)}
                          </div>
                          <div className="flex items-center">
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 bg-charcoal/5 text-charcoal rounded-l hover:bg-charcoal/10 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <div className="w-8 bg-white text-charcoal py-1 text-center font-medium text-sm border-t border-b border-charcoal/10">
                              {item.quantity}
                            </div>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 bg-charcoal/5 text-charcoal rounded-r hover:bg-charcoal/10 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                        
                        {/* Total Price */}
                        <div className="flex justify-between items-center w-full md:w-1/6 md:justify-center mt-4 md:mt-0">
                          <div className="md:hidden text-charcoal">
                            Total
                          </div>
                          <span className="font-medium text-charcoal">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Remove Button - Always visible */}
                        <div className="mt-4 md:mt-0 md:ml-4">
                          <button 
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-2 text-charcoal/50 hover:text-error-500 transition-colors"
                            aria-label="Remove item"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <div className="flex justify-between mt-6">
                <Link 
                  to="/shop" 
                  className="inline-flex items-center text-charcoal hover:text-gold transition-colors"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {/* Order Summary */}
          <div>
            <AnimatedSection delay={0.3}>
              <CartSummary isCheckout={true} />
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;