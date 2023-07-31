import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: localStorage.getItem("user_theme") ? localStorage.getItem("user_theme"): 'Light',
  reducers: {
    changeTheme: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
