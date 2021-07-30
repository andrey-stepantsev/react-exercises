import { RootState } from "@/redux/store";
import { getTimerStart } from "./selectors";

const getState = (timerStart: number) => ({
  game: {
    timerStart,
  },
});

describe("getTimerStart", () => {
  it("return current timerStart", () => {
    const timerStart = Date.now();
    const state = getState(timerStart);
    expect(getTimerStart(state as RootState)).toEqual(timerStart);
  });
});
