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

const getState = (gameField: ICell[][]): IGameState => ({
  gameField,
  score: 8,
  maxScore: 8,
  timer: "00:10",
  timerStart,
  gameStatus: GameStatus.IN_PROCESS,
});

const vector = Direction[37];

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
    const state = getState(gameField);
    reducer(state, actions.merge(vector));
    expect(getCoordinates).toHaveBeenCalledTimes(1);
  });
  it("call getNext expected times when there are not empty cells", () => {
    const gameField = getGameField();
    const state = getState(gameField);
    reducer(state, actions.merge(vector));
    expect(getNext).toHaveBeenCalledTimes(4);
  });
  it("do not call getNext when there are empty cells", () => {
    const gameField = getEmptyGameField();
    const state = getState(gameField);
    reducer(state, actions.merge(vector));
    expect(getNext).not.toHaveBeenCalled();
  });
  it("return expected merged field", () => {
    const gameField = getGameField();
    const state = getState(gameField);
    const expectedGameField = getMergedGameField();
    const actualGameField = reducer(state, actions.merge(vector)).gameField;
    expect(actualGameField).toEqual(expectedGameField);
  });
  it("return expected status when there are not available moves", () => {
    const gameField = getLoseGameField();
    const state = getState(gameField);
    const actualGameStatus = reducer(state, actions.merge(vector)).gameStatus;
    expect(actualGameStatus).toEqual(GameStatus.LOSE);
  });
  it("return expected status when win", () => {
    const gameField = getWinGameField();
    const state = getState(gameField);
    const actualGameStatus = reducer(state, actions.merge(vector)).gameStatus;
    expect(actualGameStatus).toEqual(GameStatus.WIN);
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
    const state = getState(gameField);
    expect(reducer(state, actions.reset())).toEqual(defaultState);
  });
});
