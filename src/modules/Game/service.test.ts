import { isSolvable, generateField, getBlank, checkPlayerClick } from "./service";

const arrFirst = [
  [0, 1],
  [2, 3],
];

const arrSecond = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 0],
];

const blankFirst = {
  blankX: 0,
  blankY: 0,
};

const blankSecond = {
  blankX: 3,
  blankY: 3,
};

describe("isSolvable", () => {
  it("valid [3, 1, 2]", () => {
    const testArray = [3, 1, 2];
    expect(isSolvable(testArray)).toBe(true);
  });
  it("valid [1, 2, 4, 3, 6, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15]", () => {
    const testArray = [1, 2, 4, 3, 6, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    expect(isSolvable(testArray)).toBe(true);
  });
  it("invalid [1, 3, 2]", () => {
    const testArray = [1, 3, 2];
    expect(isSolvable(testArray)).toBe(false);
  });
  it("invalid [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 14]", () => {
    const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 14];
    expect(isSolvable(testArray)).toBe(false);
  });
});

describe("generateField", () => {
  test.each([
    [generateField(2), 2, 2],
    [generateField(4), 4, 4],
  ])("generated field %j has the correct sizes (%d x %d)", (field, expectedWidth, expectedHeight) => {
    const rowsCount = field.length;
    const colsCount = field[0].length;
    expect(rowsCount).toBe(expectedHeight);
    expect(colsCount).toBe(expectedWidth);
  });
});

describe("getBlank", () => {
  it("return expected blank position", () => {
    expect(getBlank(arrFirst)).toEqual(blankFirst);
    expect(getBlank(arrSecond)).toEqual(blankSecond);
  });
});

describe("checkPlayerClick", () => {
  it("return true when offset == 1", () => {
    const coordinatesFirst = { x: 0, y: 1 };
    const coordinatesSecond = { x: 1, y: 0 };
    expect(checkPlayerClick(coordinatesFirst, blankFirst)).toBeTruthy();
    expect(checkPlayerClick(coordinatesSecond, blankFirst)).toBeTruthy();
  });
  it("return false when offset != 1", () => {
    const coordinatesFirst = { x: 0, y: 0 };
    const coordinatesSecond = { x: 2, y: 2 };
    expect(checkPlayerClick(coordinatesFirst, blankSecond)).toBeFalsy();
    expect(checkPlayerClick(coordinatesSecond, blankSecond)).toBeFalsy();
  });
});
