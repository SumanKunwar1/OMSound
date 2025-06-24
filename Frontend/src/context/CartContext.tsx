import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Complete Product interface matching your actual product data
export interface Product {
  id: string;
  name: string;
  price: number;
  size: string;
  tone: string;
  type: string;
  image: string; // Single image for cart display
  images?: string[]; // Optional array of images from product data
  audio?: string;
  video?: string;
  description: string;
  category?: string;
  musicalNote?: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  details?: string[];
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

interface CartProviderProps {
  children: ReactNode;
}

function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Validate cart data structure
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        }
      }
    } catch (error) {
      console.error('Error loading cart from localStorage', error);
      // Clear corrupted cart data
      localStorage.removeItem('cart');
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage', error);
    }
  }, [cart]);

  const addToCart = (product: Product, quantity: number) => {
    try {
      // Validate inputs
      if (!product || !product.id || quantity <= 0) {
        throw new Error('Invalid product or quantity');
      }

      setCart((prevCart) => {
        const existingItem = prevCart.find(item => item.product.id === product.id);
        
        if (existingItem) {
          // Update existing item quantity
          return prevCart.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          // Add new item to cart
          return [...prevCart, { product, quantity }];
        }
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error; // Re-throw to handle in component
    }
  };

  const removeFromCart = (productId: string) => {
    try {
      if (!productId) {
        throw new Error('Product ID is required');
      }
      
      setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    try {
      if (!productId) {
        throw new Error('Product ID is required');
      }

      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
      
      setCart(prevCart =>
        prevCart.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const clearCart = () => {
    try {
      setCart([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  // Safe calculations with error handling
  const totalItems = cart.reduce((total, item) => {
    try {
      return total + (item.quantity || 0);
    } catch (error) {
      console.error('Error calculating total items:', error);
      return total;
    }
  }, 0);
  
  const totalPrice = cart.reduce((total, item) => {
    try {
      const price = item.product.price || 0;
      const quantity = item.quantity || 0;
      return total + (price * quantity);
    } catch (error) {
      console.error('Error calculating total price:', error);
      return total;
    }
  }, 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;