import { configureStore } from "@reduxjs/toolkit";
import { menuApi } from "./menuApi";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    [menuApi.reducerPath]: menuApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(menuApi.middleware),
});

export default store;
