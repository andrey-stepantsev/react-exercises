import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameMode } from "@/enums/GameEnums";
import { GameSettings } from "@/types/GameTypes";

export type GameSettingsState = {
  settings: GameSettings;
};

export const defaultSettings: GameSettings = {
  gameMode: GameMode.FREE,
  fieldSize: 2,
};

export const defaultState: GameSettingsState = {
  settings: defaultSettings,
};

const gameSettings = createSlice({
  name: "gameSettings",
  initialState: defaultState,
  reducers: {
    update: (state, action: PayloadAction<GameSettings>) => {
      state.settings = action.payload;
      return state;
    },
    reset: () => {
      return defaultState;
    },
  },
});

export const { actions, reducer } = gameSettings;
