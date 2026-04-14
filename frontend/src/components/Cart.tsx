import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-24 pb-16 px-4 transition-colors duration-300`}>
        <div className="max-w-4xl mx-auto text-center">
          <svg className="w-24 h-24 mx-auto mb-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} mb-4 transition-colors duration-300`}>
            Your Cart is Empty
          </h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-8 transition-colors duration-300`}>
            Add some amazing cat tech products to get started!
          </p>
          <button
            onClick={() => navigate('/products')}
            className="bg-primary hover:bg-accent text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-24 pb-16 px-4 transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} mb-8 transition-colors duration-300`}>
          Shopping Cart ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div
                key={item.productId}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 transition-colors duration-300`}
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg p-4 w-32 h-32 flex-shrink-0 transition-colors duration-300`}>
                    <img
                      src={`/${item.imgName}`}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} mb-2 transition-colors duration-300`}>
                      {item.name}
                    </h3>

                    {/* Price */}
                    <div className="mb-4">
                      {item.discount ? (
                        <div className="flex items-center gap-3">
                          <span className="text-gray-500 line-through">
                            ${item.price.toFixed(2)}
                          </span>
                          <span className="text-xl font-bold text-primary">
                            ${(item.price * (1 - item.discount)).toFixed(2)}
                          </span>
                          <span className="bg-primary text-white px-2 py-1 rounded text-sm">
                            {Math.round(item.discount * 100)}% OFF
                          </span>
                        </div>
                      ) : (
                        <span className="text-xl font-bold text-primary">
                          ${item.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Quantity Control */}
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg p-2 transition-colors duration-300`}>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors`}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className={`${darkMode ? 'text-light' : 'text-gray-800'} min-w-[2rem] text-center transition-colors duration-300`}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors`}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-red-600 hover:text-red-700 font-medium transition-colors"
                      >
                        Remove
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-colors duration-300`}>
                      <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
                        Subtotal: 
                      </span>
                      <span className={`ml-2 font-bold text-primary`}>
                        ${(
                          (item.discount ? item.price * (1 - item.discount) : item.price) * item.quantity
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 h-fit sticky top-20 transition-colors duration-300`}>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} mb-6 transition-colors duration-300`}>
              Order Summary
            </h2>

            {/* Itemized Totals */}
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-300">
              <div className="flex justify-between">
                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
                  Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                </span>
                <span className={`${darkMode ? 'text-light' : 'text-gray-800'} font-medium transition-colors duration-300`}>
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
                  Shipping
                </span>
                <span className={`${darkMode ? 'text-light' : 'text-gray-800'} font-medium transition-colors duration-300`}>
                  Free
                </span>
              </div>
              <div className="flex justify-between">
                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
                  Tax
                </span>
                <span className={`${darkMode ? 'text-light' : 'text-gray-800'} font-medium transition-colors duration-300`}>
                  $0.00
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="mb-8 flex justify-between items-center">
              <span className={`text-xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                Total:
              </span>
              <span className="text-3xl font-bold text-primary">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>

            {/* Checkout Button */}
            <button
              className="w-full bg-primary hover:bg-accent text-white py-3 rounded-lg font-bold transition-colors mb-4"
            >
              Proceed to Checkout
            </button>

            {/* Continue Shopping Button */}
            <button
              onClick={() => navigate('/products')}
              className={`w-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${darkMode ? 'text-light' : 'text-gray-800'} py-3 rounded-lg font-medium transition-colors`}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}