import { RootState } from "@/redux/store";

export const getGameField = (state: RootState): number[][] => {
  return state.game.gameField;
};
