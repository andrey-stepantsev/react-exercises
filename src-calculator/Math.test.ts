import { add, sub, mul, div, pow, sin, cos, tg } from "./Math";

describe("binary operations test cases", () => {
  it("add 1 + 2 equals 3", () => expect(add(1, 2)).toBe(3));
  it("sub 1 - 2 equals -1", () => expect(sub(1, 2)).toBe(-1));
  it("mul 1 * 2 equals 2", () => expect(mul(1, 2)).toBe(2));
  it("div 4 / 2 equals 2", () => expect(div(4, 2)).toBe(2));
  it("pow 2 ^ 2 equals 4", () => expect(pow(2, 2)).toBe(4));
  it("pow 5 ^ 2 equals 25", () => expect(pow(5, 2)).toBe(25));
});

describe("functions test cases", () => {
  it("sin(30)", () => expect(sin(30)).toBe(0.5));
  it("sin(0)", () => expect(sin(0)).toBe(0));
  it("cos(60)", () => expect(cos(60)).toBe(0.5));
  it("cos(0)", () => expect(cos(0)).toBe(1));
  it("tg(60)", () => expect(tg(60)).toBe(1.73));
  it("tg(0)", () => expect(tg(0)).toBe(0));
});
