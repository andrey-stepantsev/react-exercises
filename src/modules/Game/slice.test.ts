import { advanceTo } from "jest-date-mock";
import { IGameState, IGameStateUpdate, ICell } from "./interface";
import { actions, reducer, defaultState } from "./slice";

const startGameField: ICell[][] = [
  [
    { value: 0, isMerged: false },
    { value: 0, isMerged: false },
  ],
  [
    { value: 2, isMerged: false },
    { value: 2, isMerged: false },
  ],
];

const endGameField: ICell[][] = [
  [
    { value: 0, isMerged: false },
    { value: 0, isMerged: false },
  ],
  [
    { value: 4, isMerged: false },
    { value: 0, isMerged: false },
  ],
];

const updateData: IGameStateUpdate = {
  gameField: endGameField,
  score: 4,
};

const timerStart = Date.now();

const stateCreate: IGameState = {
  gameField: expect.any(Array),
  score: 0,
  maxScore: 0,
  timer: "00:00",
  timerStart,
};

const stateStartFirst: IGameState = {
  gameField: startGameField,
  score: 0,
  maxScore: 0,
  timer: "00:00",
  timerStart,
};

const stateStartSecond: IGameState = {
  ...stateStartFirst,
  maxScore: 8,
};

const stateEndFirst: IGameState = {
  gameField: endGameField,
  score: 4,
  maxScore: 4,
  timer: "00:00",
  timerStart,
};

const stateEndSecond: IGameState = {
  ...stateEndFirst,
  maxScore: 8,
};

describe("create", () => {
  it("create game and start timer", () => {
    advanceTo(stateCreate.timerStart);
    expect(reducer(defaultState, actions.create(4))).toEqual(stateCreate);
  });
});

describe("update", () => {
  it("update gameField, score and maxScore", () => {
    expect(reducer(stateStartFirst, actions.update(updateData))).toEqual(stateEndFirst);
  });
  it("update only gameField and score", () => {
    expect(reducer(stateStartSecond, actions.update(updateData))).toEqual(stateEndSecond);
  });
});

describe("updateTimer", () => {
  it("set timer to the state", () => {
    const timerNew = "00:30";
    expect(reducer(defaultState, actions.updateTimer(timerNew)).timer).toEqual(timerNew);
  });
});

describe("reset", () => {
  it("return default state", () => {
    expect(reducer(stateEndSecond, actions.reset())).toEqual(defaultState);
  });
});
