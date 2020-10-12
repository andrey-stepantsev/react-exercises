import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateField } from "./service";

export type Coordinates = {
  x: number;
  y: number;
};

export enum GameStatus {
  NOT_STARTED,
  STARTED,
  FINISHED,
}

export type GameState = {
  gameField: number[][];
  gameStatus: GameStatus;
};

export const defaultState: GameState = {
  gameField: [],
  gameStatus: GameStatus.NOT_STARTED,
};

export const gameSlice = createSlice({
  name: "game",
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
      }
      return state;
    },
    reset: () => {
      return defaultState;
    },
  },
});

export const { actions, reducer } = gameSlice;
