import { actions, reducer, defaultState, StatisticState } from "./slice";

const statisticState: StatisticState = {
  timeStart: Date.now(),
  time: "05:00",
  stepsCount: 10,
};

describe("statisticSlice", () => {
  it("startTime reducer sets the timeStart", () => {
    expect(reducer(defaultState, actions.startTime).timeStart).not.toBeUndefined();
  });
  it("updateTime reducer sets the passed time to the state", () => {
    const { time } = statisticState;
    expect(reducer(defaultState, actions.updateTime(time)).time).toEqual(time);
  });
  it("updateStepsCount reducer increases the steps count", () => {
    const { stepsCount } = statisticState;
    expect(reducer(statisticState, actions.updateStepsCount).stepsCount).toEqual(stepsCount + 1);
  });
  it("reset reducer returns the default state", () => {
    expect(reducer(statisticState, actions.reset)).toEqual(defaultState);
  });
});
