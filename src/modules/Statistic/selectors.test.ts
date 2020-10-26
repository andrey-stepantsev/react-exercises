import { RootState } from "@/redux/store";
import { getTimeStart } from "./selectors";

type StateType = {
  statistic: {
    timeStart: number | undefined;
  };
};

const state: StateType = {
  statistic: {
    timeStart: undefined,
  },
};

describe("getTimeStart", () => {
  it("return timeStart when timeStart is not undefined", () => {
    const currentTime = Date.now();
    state.statistic.timeStart = currentTime;
    expect(getTimeStart(state as RootState)).toBe(currentTime);
  });
  it("return undefined when timeStart is undefined", () => {
    state.statistic.timeStart = undefined;
    expect(getTimeStart(state as RootState)).toBeUndefined();
  });
});
