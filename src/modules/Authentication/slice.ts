import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthenticationState = {
  userName: string | undefined;
};

export const defaultState: AuthenticationState = {
  userName: undefined,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: defaultState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
      return state;
    },
    logout: (state) => {
      state = defaultState;
      return state;
    },
  },
});

export const { actions, reducer } = authenticationSlice;
