import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const defaultState = "00:00";

export const timerSlice = createSlice({
  name: "timer",
  initialState: defaultState,
  reducers: {
    update: (state, action: PayloadAction<string>) => {
      state = action.payload;
      return state;
    },
    reset: (state) => {
      state = defaultState;
      return state;
    },
  },
});

export const { actions, reducer } = timerSlice;
