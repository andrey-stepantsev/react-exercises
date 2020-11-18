import { advanceTo, advanceBy } from "jest-date-mock";
import { getTime, convertTime } from "./Time";

const timeStart = Date.now();

describe("getTime", () => {
  it("return the elapsed time from the beginning", () => {
    advanceTo(timeStart);
    advanceBy(1000);
    expect(getTime(timeStart)).toBe("00:01");
    advanceBy(10000);
    expect(getTime(timeStart)).toBe("00:11");
    advanceTo(0);
  });
});

describe("convertTime", () => {
  it("convert milliseconds to formatted time", () => {
    expect(convertTime(1000)).toBe("00:01");
    expect(convertTime(10000)).toBe("00:10");
    expect(convertTime(60000)).toBe("01:00");
    expect(convertTime(600000)).toBe("10:00");
  });
});
