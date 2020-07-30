import { isSolvable, generateField } from "./GameUtils";

describe("Solvable test cases", () => {
  it("is solvable [3, 1, 2]", () => {
    const testArray = [3, 1, 2];
    expect(isSolvable(testArray)).toBe(true);
  });
  it("is solvable [1, 2, 4, 3, 6, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15]", () => {
    const testArray = [1, 2, 4, 3, 6, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    expect(isSolvable(testArray)).toBe(true);
  });
});

describe("Unsolvable test cases", () => {
  it("is unsolvable [1, 3, 2]", () => {
    const testArray = [1, 3, 2];
    expect(isSolvable(testArray)).toBe(false);
  });
  it("is unsolvable [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 14]", () => {
    const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 14];
    expect(isSolvable(testArray)).toBe(false);
  });
});

describe("Generate field test cases", () => {
  it("the generated field has the correct sizes (2 x 2)", () => {
    const testArray = generateField(2, 2);
    const rowsCount = testArray.length;
    const colsCount = testArray[0].length;
    expect(rowsCount).toBe(2);
    expect(colsCount).toBe(2);
  });
  it("the generated field has the correct sizes (4 x 4)", () => {
    const testArray = generateField(4, 4);
    const rowsCount = testArray.length;
    const colsCount = testArray[0].length;
    expect(rowsCount).toBe(4);
    expect(colsCount).toBe(4);
  });
});
