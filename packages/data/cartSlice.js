import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  order: null,
  delivery: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((_, index) => index !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setOrder } =
  cartSlice.actions;

export default cartSlice.reducer;
