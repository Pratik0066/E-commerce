import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

// Define the base URL for our backend
const baseQuery = fetchBaseQuery({ baseUrl: '' }); 

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User'], // Used for automatic data refreshing
  endpoints: (builder) => ({
    // We will inject endpoints (like getProducts) from other files
  }),
});