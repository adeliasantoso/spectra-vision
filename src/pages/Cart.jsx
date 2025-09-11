import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { success, info, warning } = useToast();
  const [removingItems, setRemovingItems] = useState(new Set());
  const [, forceUpdate] = useState({});

  // Animation state for sections
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  // Debug: Monitor cartItems changes
  useEffect(() => {
    console.log('Cart component: cartItems changed, length:', cartItems.length);
  }, [cartItems]);

  // Animation observer for scroll-triggered animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '-50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set(prev).add(entry.target.id));
        }
      });
    }, observerOptions);

    // Observe all sections
    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      info('Removed');
    } else {
      updateQuantity(productId, newQuantity);
      info('Updated');
    }
  };

  const handleRemoveItem = (productId, productName) => {
    setRemovingItems(prev => new Set(prev).add(productId));
    
    setTimeout(() => {
      removeFromCart(productId);
      warning('Removed');
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }, 300);
  };

  const handleClearCart = () => {
    console.log('Before clear, cartItems length:', cartItems.length);
    clearCart();
    warning('Cart cleared');
    console.log('After clear, cartItems length should be 0...');
    // Force re-render to ensure empty cart state shows immediately
    setTimeout(() => {
      console.log('In timeout, cartItems length:', cartItems.length);
      forceUpdate({});
    }, 100);
  };

  const formatPrice = (price) => {
    // Safety check - return early if price is invalid
    if (!price && price !== 0) return '0.00';
    
    try {
      // Convert to number directly if it's already a number
      if (typeof price === 'number') {
        return price.toFixed(2);
      }
      
      // Convert to string safely and clean it
      const priceStr = String(price);
      const cleanPrice = priceStr.replace(/[£$,\s]/g, '');
      const numPrice = parseFloat(cleanPrice);
      
      // Return formatted number or fallback
      return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
    } catch (error) {
      console.error('formatPrice error:', error, 'price:', price);
      return '0.00';
    }
  };

  console.log('Rendering Cart component. cartItems.length:', cartItems.length);
  
  if (cartItems.length === 0) {
    console.log('Showing empty cart state');
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        
        <section 
          id="empty-cart"
          className="pt-24 md:pt-32 pb-12 md:pb-20"
        >
          <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12 text-center">
            <h1 className="text-2xl md:text-4xl font-light text-black mb-6 md:mb-8">Your Cart</h1>
            <div className="py-8 md:py-16">
              <svg className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h10a1 1 0 001-1v-6m-8 6V9a1 1 0 011-1h6a1 1 0 011 1v8" />
              </svg>
              <h2 className="text-lg md:text-xl font-light text-gray-600 mb-3 md:mb-4">Your cart is empty</h2>
              <p className="text-sm md:text-base text-gray-500 mb-6 md:mb-8">Add some products to get started</p>
              <Link
                to="/shop"
                className="inline-block bg-black text-white px-6 md:px-8 py-2.5 md:py-3 font-medium hover:bg-gray-800 transition-colors duration-200 rounded-lg text-base"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section 
        id="cart-main"
        ref={(el) => sectionRefs.current['cart-main'] = el}
        className="pt-24 md:pt-32 pb-12 md:pb-20"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
          <h1 className={`text-2xl md:text-4xl font-light text-black mb-8 md:mb-12 text-center transform transition-all duration-1000 ease-out ${
            visibleSections.has('cart-main') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '200ms' }}>Your Cart</h1>
          
          <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 transition-all duration-700 delay-200 ${
            visibleSections.has('cart-main') ? 'animate-fade-up opacity-100' : 'opacity-0 translate-y-8'
          }`}>
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4 md:space-y-6">
                {cartItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className={`flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 border-b border-gray-200 pb-4 md:pb-6 transition-all duration-700 ${
                      removingItems.has(item.id) 
                        ? 'opacity-0 transform translate-x-full scale-95' 
                        : visibleSections.has('cart-main')
                          ? 'opacity-100 transform translate-x-0 scale-100 animate-fade-up'
                          : 'opacity-0 translate-y-8'
                    }`}
                    style={{
                      animationDelay: visibleSections.has('cart-main') ? `${400 + (index * 100)}ms` : '0ms'
                    }}
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mx-auto sm:mx-0">
                      <img
                        src={item.images ? item.images[0] : item.image}
                        alt={item.name}
                        className="w-full h-full object-contain rounded-2xl"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-base md:text-lg font-medium text-black mb-1">{item.name}</h3>
                      <p className="text-sm md:text-base text-gray-600">£{formatPrice(item.price)}</p>
                    </div>

                    {/* Mobile Layout: Quantity and Price */}
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-center space-x-3">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-150 text-sm"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-medium text-base transition-all duration-200">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-150 text-sm"
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-center sm:text-right">
                        <p className="text-base md:text-lg font-semibold text-black">
                          £{(parseFloat(formatPrice(item.price)) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.id, item.name)}
                      className="text-gray-400 hover:text-red-500 hover:scale-110 active:scale-95 transition-all duration-200 self-center sm:self-start p-1 rounded-full hover:bg-red-50"
                      title="Remove item"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Clear Cart Button */}
              <div className="mt-6 md:mt-8 text-center sm:text-left">
                <button
                  onClick={handleClearCart}
                  className="text-gray-600 hover:text-red-500 transition-colors text-sm md:text-base"
                >
                  Clear all items
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-4 md:p-6 lg:sticky lg:top-24">
                <h3 className="text-lg md:text-xl font-medium text-black mb-4 md:mb-6">Order Summary</h3>
                
                <div className="space-y-3 md:space-y-4">
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">£{getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-600">Tax (20%)</span>
                    <span className="font-medium">£{(getTotalPrice() * 0.2).toFixed(2)}</span>
                  </div>
                  <hr className="my-3 md:my-4" />
                  <div className="flex justify-between text-lg md:text-xl font-medium">
                    <span>Total</span>
                    <span>£{(getTotalPrice() * 1.2).toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="block w-full bg-black text-white px-4 md:px-6 py-3 md:py-4 font-medium mt-4 md:mt-6 hover:bg-gray-800 transition-colors duration-200 rounded-lg text-sm md:text-base text-center"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  to="/shop"
                  className="block text-center text-gray-600 hover:text-black transition-colors mt-3 md:mt-4 text-sm md:text-base"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cart;