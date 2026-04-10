import { apiSlice } from './apiSlice';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint to create a new order
    createOrder: builder.mutation({
      query: (order) => ({
        url: '/api/orders',
        method: 'POST',
        body: { ...order },
      }),
    }),

    // Endpoint to get a single order's details by ID
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `/api/orders/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    // NEW: Endpoint to get orders belonging to the logged-in user
    getMyOrders: builder.query({
      query: () => ({
        url: '/api/orders/mine',
      }),
      keepUnusedDataFor: 5,
    }),
    

    
   payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `/api/orders/${orderId}/pay`,
        method: 'PUT',
        body: { ...details }, // This will contain the Razorpay Payment ID
      }),
    }),
    getRazorpayKey: builder.query({
      query: () => ({
        url: '/api/config/razorpay',
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: '/api/orders',
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `/api/orders/${orderId}/deliver`,
        method: 'PUT',
      }),
    }),
  }),
});

// Export all the hooks for use in your components
export const { 
  useCreateOrderMutation, 
  useGetOrderDetailsQuery, 
  useGetMyOrdersQuery, 
  usePayOrderMutation, 
  useGetRazorpayKeyQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,

} = ordersApiSlice;