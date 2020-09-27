import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum GameMode {
  FREE = "Свободный режим",
  RATING = "Соревновательный режим",
}

export type SettingsState = {
  gameMode: GameMode;
  fieldSize: 2 | 4 | 6 | 8;
};

export const defaultState: SettingsState = {
  gameMode: GameMode.FREE,
  fieldSize: 2,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState: defaultState,
  reducers: {
    update: (state, action: PayloadAction<SettingsState>) => {
      state = action.payload;
      return state;
    },
    reset: () => {
      return defaultState;
    },
  },
});

export const { actions, reducer } = settingsSlice;
