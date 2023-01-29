import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./features/userSlice";
import storeReducer from "./features/storeSlice";
import favoriteReducer from "./features/favoriteSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    store: storeReducer,
    favorites: favoriteReducer,
  },
})
