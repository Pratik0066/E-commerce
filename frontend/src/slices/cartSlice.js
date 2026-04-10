import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const updateCart = (state) => {
  const itemsPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  state.itemsPrice = itemsPrice.toFixed(2);
  state.shippingPrice = (itemsPrice > 100 ? 0 : 10).toFixed(2);
  state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice)).toFixed(2);
  localStorage.setItem('cart', JSON.stringify(state));
  return state; // Ensure we return the state
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) => (x._id === existItem._id ? item : x));
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
  },
});

// 1. Export the individual actions
export const { 
  addToCart, 
  removeFromCart, 
  saveShippingAddress, 
  savePaymentMethod 
} = cartSlice.actions;

// 2. THIS IS THE LINE VITE IS COMPLAINING ABOUT:
export default cartSlice.reducer;