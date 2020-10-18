import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateField } from "./service";

export type Coordinates = {
  x: number;
  y: number;
};

export type Blank = {
  blankX: number;
  blankY: number;
};

export type UpdateData = {
  coordinates: Coordinates;
  blank: Blank;
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

export const playerMove = createAction<Coordinates>("game/playerMove");

export const gameSlice = createSlice({
  name: "game",
  initialState: defaultState,
  reducers: {
    generate: (state, action: PayloadAction<number>) => {
      state.gameField = generateField(action.payload);
      state.gameStatus = GameStatus.STARTED;
      return state;
    },
    update: (state, action: PayloadAction<UpdateData>) => {
      const { blankX, blankY } = action.payload.blank;
      const { x, y } = action.payload.coordinates;
      state.gameField[blankY][blankX] = state.gameField[y][x];
      state.gameField[y][x] = 0;
      return state;
    },
    reset: () => {
      return defaultState;
    },
  },
});

export const { actions, reducer } = gameSlice;
