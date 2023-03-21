import { createSlice } from "@reduxjs/toolkit";

const addtoCartSlice = createSlice({
  name: "addtoCart",
  initialState: {
    added: false,
  },
  reducers: {
    addAnimation: (state) => {
      state.added = true;
    },
    resetAdd: (state) => {
      state.added = false;
    },
  },
});

export const { addAnimation, resetAdd } = addtoCartSlice.actions;
export default addtoCartSlice.reducer;
