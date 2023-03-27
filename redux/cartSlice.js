import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    totalQuan: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const itemInCart = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (itemInCart) {
        itemInCart.quantity += action.payload.quantity;
        state.totalQuan += action.payload.quantity;
      } else {
        // console.log(action.payload);
        state.products.push(action.payload);
        state.quantity += action.payload.quantity;
        state.totalQuan += action.payload.quantity;
        state.total += action.payload.price * action.payload.quantity;
      }
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.totalQuan = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
