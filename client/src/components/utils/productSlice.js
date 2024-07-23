import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    categoryWithImg: [],
  },
  reducers: {
    setCategoriesWithImages: (state, action) => {
      state.categoryWithImg = action.payload;
    },
  },
});

export const { setCategoriesWithImages } = productSlice.actions;
export default productSlice.reducer;
