import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  userName: string | undefined;
};

export const defaultState: UserState = {
  userName: undefined,
};

const user = createSlice({
  name: "user",
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

export const { actions, reducer } = user;
