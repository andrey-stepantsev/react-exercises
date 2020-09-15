import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GameTimerState = {
  timer: string;
};

export const defaultState: GameTimerState = {
  timer: "00:00",
};

const gameTimer = createSlice({
  name: "gameTimer",
  initialState: defaultState,
  reducers: {
    update: (state, action: PayloadAction<string>) => {
      state.timer = action.payload;
      return state;
    },
    reset: () => {
      return defaultState;
    },
  },
});

export const { actions, reducer } = gameTimer;
