import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthenticationState = {
  userName: string;
};

export const defaultState: AuthenticationState = {
  userName: "",
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: defaultState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
      return state;
    },
    logout: () => {
      return defaultState;
    },
  },
});

export const { actions, reducer } = authenticationSlice;
