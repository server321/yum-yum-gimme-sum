import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const API_USER = import.meta.env.VITE_API_USER;

export const menuApi = createApi({
  reducerPath: "menuApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.set("x-zocom", API_KEY);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMenuItems: builder.query({
      query: () => "/menu",
    }),

    placeOrder: builder.mutation({
      query: (order) => ({
        url: `/${API_USER}/orders`,
        method: "POST",
        body: order,
      }),
    }),
  }),
});

export const { useGetMenuItemsQuery, usePlaceOrderMutation } = menuApi;
