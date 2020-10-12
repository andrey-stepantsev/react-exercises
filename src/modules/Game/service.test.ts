import { isSolvable, generateField, saveField, clearField } from "./service";

const setItem = jest.spyOn(Storage.prototype, "setItem");
const removeItem = jest.spyOn(Storage.prototype, "removeItem");

const testField = [
  [3, 2],
  [1, 0],
];

const testFieldJSON = JSON.stringify(testField);

describe("isSolvable valid cases", () => {
  it("valid isSolvable [3, 1, 2]", () => {
    const testArray = [3, 1, 2];
    expect(isSolvable(testArray)).toBe(true);
  });
  it("valid isSolvable [1, 2, 4, 3, 6, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15]", () => {
    const testArray = [1, 2, 4, 3, 6, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    expect(isSolvable(testArray)).toBe(true);
  });
});

describe("isSolvable invalid cases", () => {
  it("invalid isSolvable [1, 3, 2]", () => {
    const testArray = [1, 3, 2];
    expect(isSolvable(testArray)).toBe(false);
  });
  it("invalid isSolvable [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 14]", () => {
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

describe("saveField", () => {
  it("saveField calls the localstorage.setItem with correct game field", async () => {
    await saveField(testField);
    expect(setItem).toHaveBeenCalledWith("GAME_FIELD", testFieldJSON);
  });
});

describe("clearField", () => {
  it("clearField calls the localstorage.removeItem with correct game field", async () => {
    await clearField();
    expect(removeItem).toHaveBeenCalledWith("GAME_FIELD");
  });
});
