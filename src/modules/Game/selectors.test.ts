import { RootState } from "@/redux/store";
import { ICell } from "./interface";
import { getGameField, getTimerStart } from "./selectors";

const gameField: ICell[][] = [
  [
    { value: 0, isMerged: false },
    { value: 0, isMerged: false },
  ],
  [
    { value: 2, isMerged: false },
    { value: 2, isMerged: false },
  ],
];

const timerStart = Date.now();

const state = {
  game: {
    gameField,
    timerStart,
  },
};

describe("getGameField", () => {
  it("return current gameField", () => {
    expect(getGameField(state as RootState)).toEqual(gameField);
  });
});

describe("getTimerStart", () => {
  it("return current timerStart", () => {
    expect(getTimerStart(state as RootState)).toEqual(timerStart);
  });
});
