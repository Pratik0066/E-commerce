import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux'; // 1. Import useDispatch
import { addToCart } from '../slices/cartSlice'; // 2. Import your cart action

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 3. Define the Handler
  const addToCartHandler = () => {
    // We default qty to 1 when adding directly from the card
    dispatch(addToCart({ ...product, qty: 1 }));
    
  };

  return (
    <div className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Container */}
      <Link to={`/product/${product._id}`} className="block relative h-64 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.countInStock === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Out of Stock
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{product.category}</p>
            <Link to={`/product/${product._id}`}>
              <h3 className="text-lg font-bold text-gray-800 hover:text-blue-600 transition truncate w-48">
                {product.name}
              </h3>
            </Link>
          </div>
          <span className="text-xl font-black text-gray-900">₹{product.price.toFixed(2)}</span>
        </div>

        <div className="flex items-center gap-1 mb-4">
          <span className="text-yellow-400">★</span>
          <span className="text-sm font-medium text-gray-600">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.numReviews})</span>
        </div>

        {/* 4. Attach the Handler to the button */}
        <button 
          onClick={addToCartHandler} 
          disabled={product.countInStock === 0}
          className={`w-full py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors ${
            product.countInStock > 0 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ShoppingCart size={18} />
          {product.countInStock > 0 ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;