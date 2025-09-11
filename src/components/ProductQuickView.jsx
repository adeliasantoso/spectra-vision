import React, { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductQuickView = memo(({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleViewFullItem = () => {
    onClose();
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm animate-modal-fade-in flex items-center justify-center z-[9999] p-4" style={{ margin: 0, top: 0, left: 0, right: 0, bottom: 0 }}>
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto animate-modal-scale-in relative shadow-2xl">
        {/* Close button - floating */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.images ? product.images[0] : product.image}
                alt={product.name}
                className="w-full h-64 md:h-80 object-contain rounded-2xl shadow-lg"
              />
              {/* Product tag */}
              <div className="absolute top-3 left-3 bg-black text-white px-3 py-1 rounded-full text-xs font-medium">
                {product.tagline}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6 flex flex-col justify-center">
              <div>
                <h3 className="text-3xl font-medium text-black mb-3 leading-tight">
                  {product.name}
                </h3>
                <p className="text-3xl font-light text-black mb-4">
                  £{typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
                </p>
                {/* Product tagline */}
                {product.tagline && (
                  <p className="text-base text-gray-600 mb-4">
                    {product.tagline}
                  </p>
                )}
              </div>


              {/* Quantity Selector */}
              <div>
                <label className="block text-base font-medium text-gray-800 mb-3">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-10 h-10 border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-100 hover:border-gray-300 hover:scale-105 active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity <= 1}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="w-16 text-center font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-100 hover:border-gray-300 hover:scale-105 active:scale-95 transition-all duration-150"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-4 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-black text-white px-8 py-4 text-lg font-semibold hover:bg-gray-800 hover:scale-[1.02] active:scale-95 transition-all duration-200 rounded-xl shadow-lg hover:shadow-xl"
                >
                  Add to Cart · £{((typeof product.price === 'number' ? product.price : parseInt(product.price.replace(/,/g, ''))) * quantity).toLocaleString()}
                </button>
                <button
                  onClick={handleViewFullItem}
                  className="w-full border-2 border-gray-200 text-gray-800 px-8 py-3 text-base font-medium hover:bg-gray-50 hover:border-gray-300 hover:scale-[1.02] active:scale-95 transition-all duration-200 rounded-xl"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductQuickView;