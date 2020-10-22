import { actions, reducer, defaultState, SettingsState, GameMode } from "./slice";

const settingsState: SettingsState = {
  gameMode: GameMode.RATING,
  fieldSize: 4,
};

describe("update", () => {
  it("set settings to state", () => {
    expect(reducer(defaultState, actions.update(settingsState))).toEqual(settingsState);
  });
});

describe("reset", () => {
  it("return default state", () => {
    expect(reducer(settingsState, actions.reset())).toEqual(defaultState);
  });
});
