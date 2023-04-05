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
      const itemInCart = state.products.find((item) => {
        console.log(item.prirce, item.extrat);
        item._id === action.payload._id &&
          item.price === action.payload.price &&
          item.extrat === action.payload.extrat;
      });
      if (itemInCart) {
        itemInCart.quantity += action.payload.quantity;
        state.totalQuan += action.payload.quantity;
      } else {
        console.log(state.products.extrat);
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

export const { addProduct, reset, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;
