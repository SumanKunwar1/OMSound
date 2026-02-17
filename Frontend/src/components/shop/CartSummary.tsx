import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart } from 'lucide-react';

interface CartSummaryProps {
  isCheckout?: boolean;
}

const CartSummary = ({ isCheckout = false }: CartSummaryProps) => {
  const { cart, totalPrice } = useCart();
  
  const shippingCost = totalPrice >= 10000 ? 0 : 500;
  const finalTotal = totalPrice + shippingCost;

  return (
    <div className="bg-ivory/50 rounded-lg shadow-md p-6 sticky top-24">
      <h3 className="font-serif text-xl text-charcoal mb-6 flex items-center">
        <ShoppingCart size={20} className="mr-2 text-gold" />
        Order Summary
      </h3>

      {cart.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-charcoal/70 mb-4">Your cart is empty</p>
          <Link to="/shop" className="btn-primary">
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item.product.id} className="flex justify-between">
                <div className="text-charcoal">
                  <span>{item.product.name}</span>
                  <span className="text-charcoal/70 text-sm"> x {item.quantity}</span>
                </div>
                <div className="font-medium text-charcoal">
                  Rs {(item.product.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-b border-charcoal/10 py-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-charcoal">Subtotal</span>
              <span className="font-medium text-charcoal">Rs {totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal">Shipping</span>
              <span className="font-medium text-charcoal">
                {shippingCost === 0 ? (
                  <span className="text-success-500">Free</span>
                ) : (
                  `Rs ${shippingCost.toLocaleString()}`
                )}
              </span>
            </div>
            {shippingCost > 0 && (
              <p className="text-xs text-success-500 mt-1">
                Add Rs {(10000 - totalPrice).toLocaleString()} more to qualify for free shipping
              </p>
            )}
          </div>
          
          <div className="flex justify-between mb-8">
            <span className="text-lg font-serif text-charcoal">Total</span>
            <span className="text-lg font-serif text-charcoal">Rs {finalTotal.toLocaleString()}</span>
          </div>
          
          {!isCheckout ? (
            <Link to="/cart" className="btn-primary w-full flex items-center justify-center">
              Checkout
              <ArrowRight size={16} className="ml-2" />
            </Link>
          ) : (
            <button className="btn-primary w-full flex items-center justify-center">
              Complete Order
              <ArrowRight size={16} className="ml-2" />
            </button>
          )}
          
          <div className="mt-6 text-center">
            <p className="text-charcoal/70 text-sm">
              Secure checkout powered by Stripe
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSummary;