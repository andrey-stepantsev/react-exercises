import { advanceTo } from "jest-date-mock";
import { Direction, GameStatus } from "./enum";
import { ICell, IGameState } from "./interface";
import { actions, reducer, defaultState } from "./slice";
import * as service from "./service";

const getNext = jest.spyOn(service, "getNext");
const getCoordinates = jest.spyOn(service, "getCoordinates");

const getGameField = () => [
  [
    { value: 2, isMerged: false },
    { value: 2, isMerged: false },
  ],
  [
    { value: 4, isMerged: false },
    { value: 8, isMerged: false },
  ],
];

const getMergedGameField = () => [
  [
    { value: 4, isMerged: false },
    { value: 2, isMerged: false },
  ],
  [
    { value: 4, isMerged: false },
    { value: 8, isMerged: false },
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

const getWinGameField = () => [
  [
    { value: 2, isMerged: false },
    { value: 4, isMerged: false },
  ],
  [
    { value: 1024, isMerged: false },
    { value: 1024, isMerged: false },
  ],
];

const getLoseGameField = () => [
  [
    { value: 0, isMerged: false },
    { value: 4, isMerged: false },
  ],
  [
    { value: 8, isMerged: false },
    { value: 16, isMerged: false },
  ],
];

const timerStart = Date.now();

const getStartState = (): IGameState => ({
  gameField: expect.any(Array),
  score: 0,
  maxScore: 0,
  timer: "00:00",
  timerStart,
  gameStatus: GameStatus.IN_PROCESS,
});

const getState = (gameField: ICell[][], score: number, maxScore: number): IGameState => ({
  gameField,
  score,
  maxScore,
  timer: "00:10",
  timerStart,
  gameStatus: GameStatus.IN_PROCESS,
});

const vector = Direction[37];

describe("defaultState", () => {
  it("expected default state", () => {
    const state = { ...defaultState };
    expect(state.gameField).toHaveLength(0);
    expect(state.score).toBe(0);
    expect(state.maxScore).toBe(0);
    expect(state.timer).toBe("00:00");
    expect(state.timerStart).toBeUndefined();
    expect(state.gameStatus).toBe(GameStatus.NOT_STARTED);
  });
});

describe("create", () => {
  it("create game and start timer", () => {
    const state = getStartState();
    advanceTo(state.timerStart);
    expect(reducer(defaultState, actions.create(4))).toEqual(state);
  });
});

describe("merge", () => {
  it("call getCoordinates expected times", () => {
    const gameField = getGameField();
    const state = getState(gameField, 0, 0);
    reducer(state, actions.merge(vector));
    expect(getCoordinates).toHaveBeenCalledTimes(1);
  });
  it("call getNext expected times when there are not empty cells", () => {
    const gameField = getGameField();
    const state = getState(gameField, 0, 0);
    reducer(state, actions.merge(vector));
    expect(getNext).toHaveBeenCalledTimes(4);
  });
  it("do not call getNext when there are empty cells", () => {
    const gameField = getEmptyGameField();
    const state = getState(gameField, 0, 0);
    reducer(state, actions.merge(vector));
    expect(getNext).not.toHaveBeenCalled();
  });
  it("return expected merged field", () => {
    const gameField = getGameField();
    const state = getState(gameField, 0, 0);
    const expectedGameField = getMergedGameField();
    const actualGameField = reducer(state, actions.merge(vector)).gameField;
    expect(actualGameField).toEqual(expectedGameField);
  });
  it("return expected status when there are not available moves", () => {
    const gameField = getLoseGameField();
    const state = getState(gameField, 0, 0);
    const actualGameStatus = reducer(state, actions.merge(vector)).gameStatus;
    expect(actualGameStatus).toEqual(GameStatus.LOSE);
  });
  it("return expected status when win", () => {
    const gameField = getWinGameField();
    const state = getState(gameField, 0, 0);
    const actualGameStatus = reducer(state, actions.merge(vector)).gameStatus;
    expect(actualGameStatus).toEqual(GameStatus.WIN);
  });
  it("increase score when cells were merged", () => {
    const gameField = getGameField();
    const state = getState(gameField, 0, 0);
    const actualScore = reducer(state, actions.merge(vector)).score;
    expect(actualScore).toBe(4);
  });
  it("not increase score when cells were not merged", () => {
    const gameField = getLoseGameField();
    const state = getState(gameField, 8, 8);
    const actualScore = reducer(state, actions.merge(vector)).score;
    expect(actualScore).toBe(8);
  });
  it("increase maxScore when maxScore is less than score", () => {
    const gameField = getGameField();
    const state = getState(gameField, 0, 0);
    const actualMaxScore = reducer(state, actions.merge(vector)).maxScore;
    expect(actualMaxScore).toBe(4);
  });
  it("not increase maxScore when maxScore is greater than score", () => {
    const gameField = getGameField();
    const state = getState(gameField, 0, 1000);
    const actualMaxScore = reducer(state, actions.merge(vector)).maxScore;
    expect(actualMaxScore).toBe(1000);
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
    const gameField = getGameField();
    const state = getState(gameField, 8, 8);
    expect(reducer(state, actions.reset())).toEqual(defaultState);
  });
});
