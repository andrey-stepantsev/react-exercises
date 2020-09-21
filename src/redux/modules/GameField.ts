import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { call, select, takeEvery } from "redux-saga/effects";
import { generateField } from "utils/GameUtils";
import { RootState } from "../store";

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

export const getGameField = ({ gameField }: RootState): number[][] => gameField.gameField;

export function* saveGameField(): Generator {
  const gameField = yield select(getGameField);
  const gameFieldJSON = JSON.stringify(gameField);
  yield call([localStorage, "setItem"], "GAME_FIELD", gameFieldJSON);
}

export function* clearGameField(): Generator {
  yield call([localStorage, "removeItem"], "GAME_FIELD");
}

export function* gameFieldSaga(): Generator {
  yield takeEvery(gameField.actions.playerMove, saveGameField);
  yield takeEvery(gameField.actions.reset, clearGameField);
}

export const { actions, reducer } = gameField;
