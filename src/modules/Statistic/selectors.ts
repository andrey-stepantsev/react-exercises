import { RootState } from "@/redux/store";

export const getTimeStart = (state: RootState): number | undefined => state.statistic.timeStart;
