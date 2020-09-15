import { createSlice, Middleware, PayloadAction } from "@reduxjs/toolkit";
import { generateField } from "utils/GameUtils";

export enum GameStatus {
  NOT_STARTED,
  STARTED,
  FINISHED,
}

export type Coordinates = {
  x: number;
  y: number;
};

export type GameFieldState = {
  gameField: number[][];
  gameStatus: GameStatus;
  stepsCount: number;
};

export const defaultState: GameFieldState = {
  gameField: [],
  gameStatus: GameStatus.NOT_STARTED,
  stepsCount: 0,
};

const gameField = createSlice({
  name: "gameField",
  initialState: defaultState,
  reducers: {
    generate: (state, action: PayloadAction<number>) => {
      state.gameField = generateField(action.payload);
      state.gameStatus = GameStatus.STARTED;
      return state;
    },
    playerMove: (state, action: PayloadAction<Coordinates>) => {
      const { x, y } = action.payload;
      const blankY = state.gameField.findIndex((v) => v.includes(0));
      const blankX = state.gameField[blankY].indexOf(0);
      const offset = Math.abs(x - blankX) + Math.abs(y - blankY);
      if (offset === 1) {
        state.gameField[blankY][blankX] = state.gameField[y][x];
        state.gameField[y][x] = 0;
        state.stepsCount++;
      }
      return state;
    },
    reset: () => {
      return defaultState;
    },
  },
});

export const gameFieldMiddleware: Middleware = ({ getState }) => (next) => (action) => {
  const resultAction = next(action);

  if (action.type === gameField.actions.playerMove.type) {
    const state = getState();
    localStorage.setItem("Field State", state);
  }

  if (action.type === gameField.actions.reset.type) {
    localStorage.removeItem("Field State");
  }

  return resultAction;
};

export const { actions, reducer } = gameField;
