import { createSlice } from "@reduxjs/toolkit";
import { lightThemeStyle } from "../constants/Constants";

const themeStyleSlice = createSlice({
  name: "themeStyles",
  initialState: "",
  reducers: {
    changeThemeStyle: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { changeThemeStyle } = themeStyleSlice.actions;
export default themeStyleSlice.reducer;
