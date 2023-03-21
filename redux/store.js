import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import addtoCartReducer from "./addtoCart";

export default configureStore({
  reducer: {
    cart: cartReducer,
    addtoCart: addtoCartReducer,
  },
});
