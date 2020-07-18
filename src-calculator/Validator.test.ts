import { validate } from "./Validator";

describe("Validator correct cases", () => {
  it("2 + 8", () => expect(validate(["2", "+", "8"])).toHaveProperty("isValid", true));
  it("2 / 2", () => expect(validate(["2", "/", "8"])).toHaveProperty("isValid", true));
  it("2 ^ 2", () => expect(validate(["2", "^", "2"])).toHaveProperty("isValid", true));
  it("8 + cos(2)", () => expect(validate(["8", "+", "cos", "(", "2", ")"])).toHaveProperty("isValid", true));
  it("tg(2 + 2)", () => expect(validate(["tg", "(", "2", "+", "2", ")"])).toHaveProperty("isValid", true));
  it("tg(cos(2))", () => expect(validate(["tg", "(", "cos", "(", "2", ")", ")"])).toHaveProperty("isValid", true));
});

describe("Validator invalid cases", () => {
  it("null", () => expect(validate(null)).toHaveProperty("isValid", false));
  it("2 -- 2", () => expect(validate(["+", "+", "2"])).toHaveProperty("isValid", false));
  it("+ 2", () => expect(validate(["+", "+", "2"])).toHaveProperty("isValid", false));
  it("+ + 2", () => expect(validate(["+", "+", "2"])).toHaveProperty("isValid", false));
  it("2 /// 2", () => expect(validate(["2", "/", "/", "/", "2"])).toHaveProperty("isValid", false));
  it("5 (2 - 2)", () => expect(validate(["5", "(", "2", "-", "2", ")"])).toHaveProperty("isValid", false));
  it("cos(4", () => expect(validate(["cos", "(", "4"])).toHaveProperty("isValid", false));
  it("cos(4))", () => expect(validate(["cos", "(", "4", ")", ")"])).toHaveProperty("isValid", false));
  it("8 + cos(2", () => expect(validate(["8", "+", "cos", "(", "2"])).toHaveProperty("isValid", false));
  it("8 + cos", () => expect(validate(["8", "+", "cos"])).toHaveProperty("isValid", false));
  it("8 +", () => expect(validate(["8", "+"])).toHaveProperty("isValid", false));
});
