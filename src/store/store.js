import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import addressSlice from "./address/addressSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    address: addressSlice,

  },
});
