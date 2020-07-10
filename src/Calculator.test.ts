import { calculate } from "./Calculator";

describe("Calculator test cases", () => {
  it("2 + 8", () => expect(calculate(["2", "+", "8"])).toEqual(10));
  it("2 / 2", () => expect(calculate(["2", "/", "2"])).toEqual(1));
  it("2 ^ 2", () => expect(calculate(["2", "^", "2"])).toEqual(4));
  it("cos(60)", () => expect(calculate(["cos", "(", "60", ")"])).toEqual(0.5));
  it("cos(60) * 2", () => expect(calculate(["cos", "(", "60", ")", "*", "2"])).toEqual(1));
  it("1 + tg(0) * 2", () => expect(calculate(["1", "+", "tg", "(", "0", ")", "*", "2"])).toEqual(1));
  it("2 * (2 - 3 * 1)", () => expect(calculate(["2", "*", "(", "2", "-", "3", "*", "1", ")"])).toEqual(-2));
  it("1 + (2 * (2 - 1))", () => expect(calculate(["1", "+", "(", "2", "*", "(", "2", "-", "1", ")", ")"])).toEqual(3));
});
