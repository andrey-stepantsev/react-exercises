import { parse } from "./Parser";

describe("Parser correct cases", () => {
  it("2 + 8", () => expect(parse("2 + 8")).toEqual(["2", "+", "8"]));
  it("2 + 8 without spaces", () => expect(parse("2+8")).toEqual(["2", "+", "8"]));
  it("2 + 8 with extra spaces", () => expect(parse(" 2  +  8 ")).toEqual(["2", "+", "8"]));
  it("2 ^ 2", () => expect(parse("2 ^ 2")).toEqual(["2", "^", "2"]));
  it("10 + 20 - 30 * 1", () => expect(parse("10 + 20 - 30 * 1")).toEqual(["10", "+", "20", "-", "30", "*", "1"]));
  it("sin(2) + 10", () => expect(parse("sin(2) + 10")).toEqual(["sin", "(", "2", ")", "+", "10"]));
  it("cos(cos(2))", () => expect(parse("cos(cos(2))")).toEqual(["cos", "(", "cos", "(", "2", ")", ")"]));
});

describe("Parser invalid cases", () => {
  it("empty string", () => expect(parse("")).toBeNull());
  it("spaces string", () => expect(parse("   ")).toBeNull());
});
