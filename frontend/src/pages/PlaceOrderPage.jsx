import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { useCreateOrderMutation } from '../slices/ordersApiSlice.js';
import { Package, Truck, CreditCard } from 'lucide-react';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      // After success, go to the individual order page (we'll build that next)
      navigate(`/order/${res._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <CheckoutSteps step1 step2 step3 step4 />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Side: Summary Details */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-black mb-4 flex items-center gap-2">
              <Truck size={20} className="text-blue-600" /> Shipping
            </h2>
            <p className="text-gray-600">
              <strong className="text-gray-900">Address: </strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-black mb-4 flex items-center gap-2">
              <CreditCard size={20} className="text-blue-600" /> Payment Method
            </h2>
            <p className="text-gray-600">
              <strong className="text-gray-900">Method: </strong>
              {cart.paymentMethod}
            </p>
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-black mb-4 flex items-center gap-2">
              <Package size={20} className="text-blue-600" /> Order Items
            </h2>
            {cart.cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cart.cartItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <Link to={`/product/${item._id}`} className="flex-1 font-bold text-gray-800 hover:text-blue-600">
                      {item.name}
                    </Link>
                    <div className="text-gray-600 font-medium">
                      {item.qty} x ${item.price} = <span className="text-gray-900 font-bold">${(item.qty * item.price).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right Side: Price Summary */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-fit">
          <h2 className="text-2xl font-black mb-6">Order Total</h2>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-gray-600 font-medium">
              <span>Items</span>
              <span>${cart.itemsPrice}</span>
            </div>
            <div className="flex justify-between text-gray-600 font-medium">
              <span>Shipping</span>
              <span>${cart.shippingPrice}</span>
            </div>
            <hr className="border-gray-100" />
            <div className="flex justify-between text-2xl font-black text-gray-900">
              <span>Total</span>
              <span>${cart.totalPrice}</span>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm font-bold">
              {error?.data?.message || error.error}
            </div>
          )}

          <button
            type="button"
            disabled={cart.cartItems.length === 0 || isLoading}
            onClick={placeOrderHandler}
            className="w-full bg-gray-900 text-white py-4 rounded-xl font-black hover:bg-blue-600 transition shadow-lg disabled:bg-gray-300"
          >
            {isLoading ? 'PROCESSING...' : 'PLACE ORDER'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;