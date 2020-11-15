import { RootState } from "@/redux/store";
import { ICell } from "./interface";

export const getGameField = (state: RootState): ICell[][] => {
  return state.game.gameField;
};

export const getTimerStart = (state: RootState): number | undefined => {
  return state.game.timerStart;
};
