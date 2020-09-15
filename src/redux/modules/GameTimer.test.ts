import { actions, reducer, defaultState } from "./GameTimer";

const testTime = "01:00";

describe("GameTimer reducer", () => {
  it("update sets the passed time to the state", () => {
    expect(reducer(defaultState, actions.update(testTime))).toEqual({ timer: testTime });
  });
  it("reset returns the default state", () => {
    expect(reducer({ timer: testTime }, actions.reset)).toEqual(defaultState);
  });
});
