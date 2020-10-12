import { RootState } from "@/redux/store";

export const getFieldSize = (state: RootState): number | undefined => state.settings.fieldSize;
