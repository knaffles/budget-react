import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

// See https://redux.js.org/usage/usage-with-typescript#define-slice-state-and-action-types
// See https://redux.js.org/tutorials/essentials/part-2-app-structure

// Define a type for the slice state
interface themeState {
  value: string;
}

// Define the initial state using that type
const initialState: themeState = {
  value: "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    switchTheme: (state, action: PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload;
    },
  },
});

export const { switchTheme } = themeSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectTheme = (state: RootState) => state.theme.value;

export default themeSlice.reducer;
