import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type StatisticState = {
  timeStart: number | undefined;
  time: string;
  stepsCount: number;
};

export const defaultState: StatisticState = {
  timeStart: undefined,
  time: "00:00",
  stepsCount: 0,
};

export const statisticSlice = createSlice({
  name: "statistic",
  initialState: defaultState,
  reducers: {
    startTime: (state) => {
      state.timeStart = Date.now();
      return state;
    },
    updateTime: (state, action: PayloadAction<string>) => {
      state.time = action.payload;
      return state;
    },
    updateStepsCount: (state) => {
      state.stepsCount++;
      return state;
    },
    reset: () => {
      return defaultState;
    },
  },
});

export const { actions, reducer } = statisticSlice;
