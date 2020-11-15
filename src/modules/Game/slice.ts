import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGameState, ICoordinate, IGameStateUpdate } from "./interface";
import { createGameField } from "./service";

export const defaultState: IGameState = {
  gameField: [],
  score: 0,
  maxScore: 0,
  timer: "00:00",
  timerStart: undefined,
};

export const merge = createAction<ICoordinate>("game/merge");

export const gameSlice = createSlice({
  name: "game",
  initialState: defaultState,
  reducers: {
    create: (state, action: PayloadAction<number>) => {
      state.gameField = createGameField(action.payload);
      state.score = 0;
      state.timer = "00:00";
      state.timerStart = Date.now();
    },
    update: (state, action: PayloadAction<IGameStateUpdate>) => {
      state.gameField = action.payload.gameField;
      state.score += action.payload.score;
      state.score > state.maxScore && (state.maxScore = state.score);
    },
    updateTimer: (state, action: PayloadAction<string>) => {
      state.timer = action.payload;
    },
    reset: () => {
      return defaultState;
    },
  },
});

export const { actions, reducer } = gameSlice;
