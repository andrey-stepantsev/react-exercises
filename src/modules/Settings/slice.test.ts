import { actions, reducer, defaultState, SettingsState, GameMode } from "./slice";

const settingsState: SettingsState = {
  gameMode: GameMode.RATING,
  fieldSize: 4,
};

describe("settingsSlice", () => {
  it("update reducer sets the passed settings to the state", () => {
    expect(reducer(defaultState, actions.update(settingsState))).toEqual(settingsState);
  });
  it("reset reducer returns the default state", () => {
    expect(reducer(settingsState, actions.reset)).toEqual(defaultState);
  });
});
