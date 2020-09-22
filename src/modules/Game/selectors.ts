import { RootState } from "@/redux/store";

export const getGameField = (state: RootState): number[][] => state.game.gameField;
