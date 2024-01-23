import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./ItemsSlice";

const store = configureStore({
  reducer: {
    items: itemsSlice,
  },
});

export default store;
