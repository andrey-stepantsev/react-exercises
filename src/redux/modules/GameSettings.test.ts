import { actions, reducer, defaultState } from "./GameSettings";
import { GameSettings } from "types/GameTypes";
import { GameMode } from "enums/GameEnums";

const testSettings: GameSettings = {
  gameMode: GameMode.RATING,
  fieldSize: 4,
};

describe("GameSettings reducer", () => {
  it("update sets the passed settings to the state", () => {
    expect(reducer(defaultState, actions.update(testSettings))).toEqual({ settings: testSettings });
  });
  it("reset returns the default state", () => {
    expect(reducer({ settings: testSettings }, actions.reset)).toEqual(defaultState);
  });
});
