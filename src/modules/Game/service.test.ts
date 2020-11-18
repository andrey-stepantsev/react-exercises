import { Direction } from "./enum";
import { ICell, ICoordinate, ICoordinates } from "./interface";
import {
  createGameField,
  setRandom,
  getEmpty,
  getCoordinates,
  getNext,
  isInBound,
  isAvailable,
  isMergeAvailable,
  isMovesAvailable,
  clearMergeStatus,
} from "./service";

const getStartGameField = () => [
  [
    { value: 4, isMerged: true },
    { value: 0, isMerged: false },
    { value: 4, isMerged: false },
    { value: 8, isMerged: false },
  ],
  [
    { value: 4, isMerged: true },
    { value: 2, isMerged: false },
    { value: 0, isMerged: false },
    { value: 2, isMerged: false },
  ],
  [
    { value: 2, isMerged: false },
    { value: 2, isMerged: false },
    { value: 2, isMerged: false },
    { value: 2, isMerged: false },
  ],
  [
    { value: 2, isMerged: false },
    { value: 0, isMerged: false },
    { value: 0, isMerged: false },
    { value: 2, isMerged: false },
  ],
];

const getEmptyGameField = () => [
  [
    { value: 0, isMerged: false },
    { value: 0, isMerged: false },
  ],
  [
    { value: 0, isMerged: false },
    { value: 0, isMerged: false },
  ],
];

const getLoseGameField = () => [
  [
    { value: 2, isMerged: false },
    { value: 4, isMerged: false },
  ],
  [
    { value: 8, isMerged: false },
    { value: 16, isMerged: false },
  ],
];

const getStartEmptyCoordinates = () => [
  { x: 1, y: 0 },
  { x: 2, y: 1 },
  { x: 1, y: 3 },
  { x: 2, y: 3 },
];

const startCoordinates: [ICoordinates, ICoordinate][] = [
  [{ Xs: [0, 1, 2, 3], Ys: [0, 1, 2, 3] }, Direction[37]],
  [{ Xs: [0, 1, 2, 3], Ys: [0, 1, 2, 3] }, Direction[38]],
  [{ Xs: [3, 2, 1, 0], Ys: [0, 1, 2, 3] }, Direction[39]],
  [{ Xs: [0, 1, 2, 3], Ys: [3, 2, 1, 0] }, Direction[40]],
];

const inBound = [
  { x: 0, y: 0 },
  { x: 1, y: 2 },
  { x: 3, y: 3 },
];

const outBound = [
  { x: -1, y: 0 },
  { x: 0, y: -1 },
  { x: 4, y: 4 },
];

const inAvailable = [
  [
    { x: 0, y: 2 },
    { x: 1, y: 2 },
  ],
  [
    { x: 2, y: 3 },
    { x: 3, y: 3 },
  ],
];

const outAvailable = [
  [
    { x: 2, y: 0 },
    { x: 3, y: 0 },
  ],
  [
    { x: 0, y: 0 },
    { x: 2, y: 0 },
  ],
];

const getTwo = (cell: ICell) => cell.value === 2;
const getFilled = (cell: ICell) => cell.value !== 0;
const getMerged = (cell: ICell) => cell.isMerged;

describe("createGameField", () => {
  it("create field with correct sizes and two numbers in random positions", () => {
    const gameField = createGameField(4);
    expect(gameField.length).toBe(4);
    expect(gameField[0].length).toBe(4);
    expect(gameField.flat().filter(getTwo).length).toBe(2);
  });
});

describe("setRandom", () => {
  it("set number in random position when there are empty cells", () => {
    const gameField = getStartGameField();
    expect(gameField.flat().filter(getFilled).length).toBe(12);
    setRandom(gameField);
    expect(gameField.flat().filter(getFilled).length).toBe(13);
  });
  it("do not set number in random position when there are not empty cells", () => {
    const gameField = getLoseGameField();
    expect(gameField.flat().filter(getFilled).length).toBe(4);
    setRandom(gameField);
    expect(gameField.flat().filter(getFilled).length).toBe(4);
  });
});

describe("getEmpty", () => {
  it("return expected empty cells coordinates when there are empty cells", () => {
    const gameField = getStartGameField();
    const emptyExpected = getStartEmptyCoordinates();
    expect(getEmpty(gameField)).toEqual(emptyExpected);
  });
  it("return empty array when there are not empty cells", () => {
    const gameField = getLoseGameField();
    expect(getEmpty(gameField).length).toBe(0);
  });
});

describe("getCoordinates", () => {
  test.each(startCoordinates)("%o by vector %o", (coordinates, vector) => {
    const gameField = getStartGameField();
    expect(getCoordinates(gameField, vector)).toEqual(coordinates);
  });
});

describe("getNext", () => {
  it("return current coordinate when next is out of bound", () => {
    const gameField = getStartGameField();
    const currentCoordinate = { x: 0, y: 1 };
    expect(getNext(gameField, currentCoordinate, Direction[37])).toEqual(currentCoordinate);
  });
  it("return current coordinate when next is not available", () => {
    const gameField = getStartGameField();
    const currentCoordinate = { x: 3, y: 0 };
    expect(getNext(gameField, currentCoordinate, Direction[37])).toEqual(currentCoordinate);
  });
  it("return expected coordinate when next is merged", () => {
    const gameField = getStartGameField();
    const currentCoordinate = { x: 2, y: 0 };
    const expectedCoordinate = { x: 1, y: 0 };
    expect(getNext(gameField, currentCoordinate, Direction[37])).toEqual(expectedCoordinate);
  });
  it("return the farthest equal coordinate when next is available and not merged", () => {
    const gameField = getStartGameField();
    const currentCoordinate = { x: 3, y: 1 };
    const expectedCoordinate = { x: 1, y: 1 };
    expect(getNext(gameField, currentCoordinate, Direction[37])).toEqual(expectedCoordinate);
  });
});

describe("isInBound", () => {
  test.each(inBound)("%o is in bound", (coordinate) => {
    const gameField = getStartGameField();
    expect(isInBound(gameField, coordinate)).toBeTruthy();
  });
  test.each(outBound)("%o is out of bound", (coordinate) => {
    const gameField = getStartGameField();
    expect(isInBound(gameField, coordinate)).toBeFalsy();
  });
});

describe("isAvailable", () => {
  test.each(inAvailable)("%o is available for %o", (next, current) => {
    const gameField = getStartGameField();
    expect(isAvailable(gameField, current, next)).toBeTruthy();
  });
  test.each(outAvailable)("%o is not available for %o", (next, current) => {
    const gameField = getStartGameField();
    expect(isAvailable(gameField, current, next)).toBeFalsy();
  });
});

describe("isMovesAvailable", () => {
  it("return true when there are available cells", () => {
    const gameField = getStartGameField();
    expect(isMovesAvailable(gameField)).toBeTruthy();
  });
  it("return false when there are not available cells", () => {
    const gameField = getLoseGameField();
    expect(isMovesAvailable(gameField)).toBeFalsy();
  });
});

describe("isMergeAvailable", () => {
  it("return true when there are cells to merge", () => {
    const gameField = getStartGameField();
    expect(isMergeAvailable(gameField)).toBeTruthy();
  });
  it("return false when there are not cells to merge", () => {
    const gameField = getLoseGameField();
    expect(isMergeAvailable(gameField)).toBeFalsy();
  });
  it("return false when there are empty cells", () => {
    const gameField = getEmptyGameField();
    expect(isMergeAvailable(gameField)).toBeFalsy();
  });
});

describe("clearMergeStatus", () => {
  it("clear merge status in game field", () => {
    const gameField = getStartGameField();
    expect(gameField.flat().filter(getMerged).length).toBe(2);
    clearMergeStatus(gameField);
    expect(gameField.flat().filter(getMerged).length).toBe(0);
  });
});
