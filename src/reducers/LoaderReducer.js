import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "spinner",
  initialState: false,
  reducers: {
    setLoader: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
