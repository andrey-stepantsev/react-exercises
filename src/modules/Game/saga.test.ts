/* eslint-disable jest/expect-expect */

import { expectSaga, testSaga } from "redux-saga-test-plan";
import { createMockTask } from "@redux-saga/testing-utils";
import { call, select } from "redux-saga-test-plan/matchers";
import { advanceBy, advanceTo } from "jest-date-mock";
import { cloneDeep } from "lodash";
import { getTime } from "@/utils/Time";
import { Direction } from "./enum";
import { IGameState } from "./interface";
import { gameSaga, makeMerge, resetGame, updateTimer } from "./saga";
import { getGameField, getTimerStart } from "./selectors";
import { clearMergeStatus, getCoordinates, getNext, setRandom } from "./service";
import { actions, defaultState, merge, reducer } from "./slice";
import { authenticationSlice } from "../Authentication";

const getStartGameField = () => [
  [
    { value: 4, isMerged: false },
    { value: 4, isMerged: false },
  ],
  [
    { value: 8, isMerged: false },
    { value: 2, isMerged: false },
  ],
];

const getEndGameField = () => [
  [
    { value: 8, isMerged: false },
    { value: 2, isMerged: false },
  ],
  [
    { value: 8, isMerged: false },
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
    { value: 16, isMerged: false },
    { value: 16, isMerged: false },
  ],
  [
    { value: 4, isMerged: false },
    { value: 8, isMerged: false },
  ],
];

const getStartState = (): IGameState => ({
  gameField: getStartGameField(),
  score: 0,
  maxScore: 0,
  timer: "00:00",
  timerStart: undefined,
});

const getEndState = (): IGameState => ({
  gameField: getEndGameField(),
  score: 8,
  maxScore: 8,
  timer: "00:00",
  timerStart: undefined,
});

describe("makeMerge", () => {
  it("full flow success", () => {
    const startState = getStartState();
    const startGameField = startState.gameField;
    const endState = getEndState();
    const endGameField = endState.gameField;
    const vector = Direction[37];
    return expectSaga(makeMerge, merge(vector))
      .withReducer(reducer, startState)
      .provide([
        [select(getGameField), startGameField],
        [call(cloneDeep, startGameField), startGameField],
      ])
      .select(getGameField)
      .call(cloneDeep, startGameField)
      .call(getCoordinates, startGameField, vector)
      .call(getNext, startGameField, { x: 0, y: 0 }, vector)
      .call(getNext, startGameField, { x: 1, y: 0 }, vector)
      .call(getNext, startGameField, { x: 0, y: 1 }, vector)
      .call(getNext, startGameField, { x: 1, y: 1 }, vector)
      .call(clearMergeStatus, startGameField)
      .call(setRandom, startGameField)
      .put(actions.update({ gameField: endGameField, score: endState.score }))
      .hasFinalState(endState)
      .run();
  });
  it("skip empty cells", () => {
    const gameField = getEmptyGameField();
    const vector = Direction[37];
    return expectSaga(makeMerge, merge(vector))
      .provide([
        [select(getGameField), gameField],
        [call(cloneDeep, gameField), gameField],
      ])
      .select(getGameField)
      .call(cloneDeep, gameField)
      .call(getCoordinates, gameField, vector)
      .not.call(getNext, gameField, { x: 0, y: 0 }, vector)
      .not.call(getNext, gameField, { x: 1, y: 0 }, vector)
      .not.call(getNext, gameField, { x: 0, y: 1 }, vector)
      .not.call(getNext, gameField, { x: 1, y: 1 }, vector)
      .call(clearMergeStatus, gameField)
      .not.call(setRandom, gameField)
      .run();
  });
  it("do not set random cell when there are not empty cells", () => {
    const gameField = getLoseGameField();
    const vector = Direction[37];
    return expectSaga(makeMerge, merge(vector))
      .provide([
        [select(getGameField), gameField],
        [call(cloneDeep, gameField), gameField],
      ])
      .select(getGameField)
      .call(cloneDeep, gameField)
      .call(getCoordinates, gameField, vector)
      .call(getNext, gameField, { x: 0, y: 0 }, vector)
      .call(getNext, gameField, { x: 1, y: 0 }, vector)
      .call(getNext, gameField, { x: 0, y: 1 }, vector)
      .call(getNext, gameField, { x: 1, y: 1 }, vector)
      .call(clearMergeStatus, gameField)
      .call(setRandom, gameField)
      .not.put(actions.update({ gameField: expect.any(Array), score: expect.any(Number) }))
      .run();
  });
});

describe("updateTimer", () => {
  it("full flow success", () => {
    const timerStart = Date.now();
    advanceTo(timerStart);
    advanceBy(5000);
    return expectSaga(updateTimer)
      .provide([[select(getTimerStart), timerStart]])
      .select(getTimerStart)
      .call(getTime, timerStart)
      .put(actions.updateTimer("00:05"))
      .delay(1000)
      .silentRun();
  });
});

describe("resetGame", () => {
  it("reset game and set default state", () => {
    const state = getStartState();
    return expectSaga(resetGame).withReducer(reducer, state).put(actions.reset()).hasFinalState(defaultState).run();
  });
});

describe("gameSaga", () => {
  it("full flow success", () => {
    const updateTimerTask = createMockTask();
    testSaga(gameSaga)
      .next()
      .takeEvery(merge.type, makeMerge)
      .next()
      .take(actions.create.type)
      .next()
      .fork(updateTimer)
      .next(updateTimerTask)
      .take(authenticationSlice.actions.logout.type)
      .next()
      .cancel(updateTimerTask)
      .next()
      .fork(resetGame)
      .finish();
  });
});
