import { actions, reducer, defaultState, SettingsState, GameMode } from "./slice";

const testSettings: SettingsState = {
  gameMode: GameMode.RATING,
  fieldSize: 4,
};

describe("settingsSlice", () => {
  it("update reducer sets the passed settings to the state", () => {
    expect(reducer(defaultState, actions.update(testSettings))).toEqual(testSettings);
  });
  it("reset reducer returns the default state", () => {
    expect(reducer(testSettings, actions.reset)).toEqual(defaultState);
  });
});
