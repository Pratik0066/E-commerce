import { useParams } from 'react-router-dom';
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetRazorpayKeyQuery } from '../slices/ordersApiSlice';
import { useSelector } from 'react-redux';
import { CheckCircle2, Clock } from 'lucide-react';

const OrderPage = () => {
  const { id: orderId } = useParams();
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const { data: razorpayKey } = useGetRazorpayKeyQuery();
  const { userInfo } = useSelector((state) => state.auth);

  const paymentHandler = async () => {
    const options = {
      key: razorpayKey.key, // Your Razorpay Key ID from backend
      amount: Math.round(order.totalPrice * 100), // Razorpay works in Paisa (e.g. 500 Rs = 50000)
      currency: "INR",
      name: "MYSTORE",
      description: `Order ${orderId}`,
      order_id: order.razorpayOrderId, // This must be sent from your backend order details
      handler: async function (response) {
        try {
          // On Success: send payment details to backend
          await payOrder({ 
            orderId, 
            details: {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            } 
          });
          refetch(); // Refresh the page to show "Paid"
          alert('Payment Successful!');
        } catch (err) {
          alert(err?.data?.message || err.error);
        }
      },
      prefill: {
        name: userInfo.name,
        email: userInfo.email,
      },
      theme: { color: "#2563eb" }, // Blue-600 to match your UI
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (isLoading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="container mx-auto px-6 py-8">
      {/* ... Previous sections: Shipping, Payment Method, Items ... */}

      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-fit">
        <h2 className="text-2xl font-black mb-6">Summary</h2>
        {/* ... Price totals ... */}

        {!order.isPaid && (
          <button
            onClick={paymentHandler}
            disabled={loadingPay}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-black hover:bg-blue-700 transition shadow-lg mt-4"
          >
            {loadingPay ? 'VERIFYING...' : 'PAY WITH RAZORPAY / UPI'}
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderPage;