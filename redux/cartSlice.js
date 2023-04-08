import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const itemIndex = state.products.findIndex(
        (item) =>
          item._id === action.payload._id &&
          item.price === action.payload.price &&
          JSON.stringify(item.extras) === JSON.stringify(action.payload.extras)
      );
      if (itemIndex !== -1) {
        state.products[itemIndex].quantity += action.payload.quantity;
        state.products[itemIndex].total +=
          action.payload.price * action.payload.quantity;
        state.quantity += action.payload.quantity;
        state.total += action.payload.price * action.payload.quantity;
      } else {
        state.products.push(action.payload);
        state.quantity += action.payload.quantity;
        state.total += action.payload.price * action.payload.quantity;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (item) =>
          item._id !== action.payload._id ||
          item.price !== action.payload.price ||
          JSON.stringify(item.extras) !== JSON.stringify(action.payload.extras)
      );
      state.quantity -= action.payload.quantity;
      state.total -= action.payload.price * action.payload.quantity;
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, reset, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;
