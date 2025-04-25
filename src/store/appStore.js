import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "./feedSlice";
import userReducer from "./userSlice";

export const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});
