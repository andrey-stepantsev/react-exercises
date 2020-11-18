import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isEqual } from "lodash";
import { IGameState, ICoordinate } from "./interface";
import { GameStatus } from "./enum";
import { createGameField, getCoordinates, getNext, clearMergeStatus, setRandom, isMovesAvailable } from "./service";

export const defaultState: IGameState = {
  gameField: [],
  score: 0,
  maxScore: 0,
  timer: "00:00",
  timerStart: undefined,
  gameStatus: GameStatus.NOT_STARTED,
};

export const gameOver = createAction("game/gameOver");

export const gameSlice = createSlice({
  name: "game",
  initialState: defaultState,
  reducers: {
    create: (state, action: PayloadAction<number>) => {
      state.gameField = createGameField(action.payload);
      state.score = 0;
      state.timer = "00:00";
      state.timerStart = Date.now();
      state.gameStatus = GameStatus.IN_PROCESS;
    },
    merge: (state, action: PayloadAction<ICoordinate>) => {
      const { gameField } = state;

      const vector = action.payload;
      const { Xs, Ys } = getCoordinates(gameField, vector);

      let isUpdated = false;

      for (const y of Ys) {
        for (const x of Xs) {
          const currentCell = gameField[y][x];
          const currentCoordinate = { x, y };
          const currentValue = currentCell.value;
          if (currentValue !== 0) {
            const nextCoordinate = getNext(gameField, currentCoordinate, vector);
            if (!isEqual(nextCoordinate, currentCoordinate)) {
              const nextCell = gameField[nextCoordinate.y][nextCoordinate.x];
              const nextValue = nextCell.value;
              const nextValueMerged = nextValue + currentValue;
              if (nextValueMerged === 2048) {
                state.gameStatus = GameStatus.WIN;
              }
              if (nextValue === currentValue) {
                nextCell.isMerged = true;
                state.score += nextValueMerged;
              }
              nextCell.value = nextValueMerged;
              currentCell.value = 0;
              isUpdated = true;
            }
          }
        }
      }

      if (state.score > state.maxScore) {
        state.maxScore = state.score;
      }

      clearMergeStatus(gameField);

      if (isUpdated && state.gameStatus !== GameStatus.WIN) {
        setRandom(gameField);
        !isMovesAvailable(gameField) && (state.gameStatus = GameStatus.LOSE);
      }
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
