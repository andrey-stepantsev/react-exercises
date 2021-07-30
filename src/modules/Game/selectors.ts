import { RootState } from "@/redux/store";

export const getTimerStart = (state: RootState): number | undefined => state.game.timerStart;
