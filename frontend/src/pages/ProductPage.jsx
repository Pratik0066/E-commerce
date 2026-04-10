import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  useGetProductDetailsQuery, 
  useCreateReviewMutation 
} from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { 
  ShoppingCart, 
  ArrowLeft, 
  Star, 
  CheckCircle2, 
  XCircle, 
  MessageSquare,
  Send
} from 'lucide-react';

const ProductPage = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingReview }] = useCreateReviewMutation();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      alert('Review Submitted Successfully!');
      setRating(0);
      setComment('');
    } catch (err) {
      alert(err?.data?.message || err.error);
    }
  };

  if (isLoading) return <div className="text-center mt-20 animate-pulse font-black text-gray-400">LOADING PRODUCT...</div>;
  if (error) return <div className="text-red-500 text-center mt-20">{error?.data?.message || error.error}</div>;

  return (
    <div className="container mx-auto px-6 py-8">
      <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold mb-8 transition w-fit">
        <ArrowLeft size={18} /> BACK TO SHOP
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        {/* PRODUCT IMAGE */}
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm p-4">
          <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-2xl" />
        </div>

        {/* PRODUCT DETAILS */}
        <div className="flex flex-col">
          <span className="text-blue-600 font-black uppercase tracking-widest text-xs mb-2">{product.brand}</span>
          <h1 className="text-4xl font-black text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6 border-b border-gray-50 pb-6">
            <div className="flex items-center gap-1 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill={i < product.rating ? "currentColor" : "none"} />
              ))}
            </div>
            <span className="text-gray-400 font-bold text-sm">{product.numReviews} REVIEWS</span>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 font-bold">Price:</span>
              <span className="text-3xl font-black text-gray-900">₹{product.price}</span>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 font-bold">Status:</span>
              {product.countInStock > 0 ? (
                <span className="flex items-center gap-1 text-green-600 font-black text-sm uppercase">
                  <CheckCircle2 size={16} /> In Stock
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-500 font-black text-sm uppercase">
                  <XCircle size={16} /> Out of Stock
                </span>
              )}
            </div>

            {product.countInStock > 0 && (
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
                <span className="text-gray-500 font-bold">Quantity:</span>
                <select 
                  className="bg-white border border-gray-200 rounded-lg px-4 py-2 font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                  value={qty} 
                  onChange={(e) => setQty(Number(e.target.value))}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  ))}
                </select>
              </div>
            )}

            <button 
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black hover:bg-blue-600 transition shadow-xl disabled:bg-gray-300 flex items-center justify-center gap-3"
            >
              <ShoppingCart size={20} /> ADD TO CART
            </button>
          </div>
        </div>
      </div>

      <hr className="border-gray-100 mb-16" />

      {/* REVIEWS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
            <MessageSquare className="text-blue-600" /> CUSTOMER FEEDBACK
          </h2>
          {product.reviews?.length === 0 && (
            <div className="bg-gray-50 p-8 rounded-2xl text-gray-400 font-medium">
              This product hasn't been reviewed yet. Be the first!
            </div>
          )}
          <div className="space-y-6">
            {(product.reviews || []).map((review) => (
              <div key={review._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-black text-gray-900 uppercase text-sm">{review.name}</h4>
                    <div className="flex gap-0.5 text-yellow-500 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-gray-300 uppercase">{review.createdAt.substring(0, 10)}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-fit sticky top-24">
          <div className="bg-gray-900 p-8 rounded-[2rem] shadow-2xl">
            <h3 className="text-white text-xl font-black mb-6 uppercase tracking-tight">Write a Review</h3>
            {userInfo ? (
              <form onSubmit={submitHandler} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Rating</label>
                  <select 
                    className="w-full bg-gray-800 border-none text-white p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                    value={rating} 
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">Select Stars...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Your Comment</label>
                  <textarea
                    rows="4"
                    className="w-full bg-gray-800 border-none text-white p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    placeholder="Tell others what you think..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={loadingReview}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-black hover:bg-white hover:text-gray-900 transition-all flex items-center justify-center gap-2"
                >
                  {loadingReview ? 'SENDING...' : <><Send size={18} /> POST REVIEW</>}
                </button>
              </form>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-400 mb-4">You must be signed in to leave a review.</p>
                <Link to="/login" className="inline-block bg-white text-gray-900 px-6 py-2 rounded-lg font-black text-sm uppercase">Sign In</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;