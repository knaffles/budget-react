import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../state/themeSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

// Define root state and dispatch types.
// See https://redux.js.org/usage/usage-with-typescript#define-root-state-and-dispatch-types

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
