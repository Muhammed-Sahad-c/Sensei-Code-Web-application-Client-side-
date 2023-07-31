import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/UserReducer";
import ThemeReducer from "../reducers/ThemeReducer";
import ErrorReducer from "../reducers/ErrorReducer";
import LoaderReducer from "../reducers/LoaderReducer";
import ThemeStyleReducer from "../reducers/ThemeStyleReducer";

export const store = configureStore({
  reducer: {
    spinner: LoaderReducer,
    error: ErrorReducer,
    user: userReducer,
    theme: ThemeReducer,
    themeStyle:ThemeStyleReducer,
  },
});
