import { actions, reducer, defaultState } from "./slice";

const testTime = "01:00";

describe("timerSlice", () => {
  it("update reducer sets the passed time to the state", () => {
    expect(reducer(defaultState, actions.update(testTime))).toEqual(testTime);
  });
  it("reset reducer returns the default state", () => {
    expect(reducer(testTime, actions.reset)).toEqual(defaultState);
  });
});
