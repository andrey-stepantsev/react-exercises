/* eslint-disable jest/expect-expect */

import { expectSaga, testSaga } from "redux-saga-test-plan";
import { createMockTask } from "@redux-saga/testing-utils";
import { select } from "redux-saga-test-plan/matchers";
import { advanceBy, advanceTo } from "jest-date-mock";
import { getTime } from "@/utils/Time";
import { ICell, IGameState } from "./interface";
import { GameStatus } from "./enum";
import { gameSaga, resetGame, updateTimer } from "./saga";
import { getTimerStart } from "./selectors";
import { actions, defaultState, gameOver, reducer } from "./slice";
import { authenticationSlice } from "@/modules/Authentication";

const getGameField = () => [
  [
    { value: 4, isMerged: false },
    { value: 4, isMerged: false },
  ],
  [
    { value: 8, isMerged: false },
    { value: 2, isMerged: false },
  ],
];

const getState = (gameField: ICell[][]): IGameState => ({
  gameField,
  score: 0,
  maxScore: 0,
  timer: "00:00",
  timerStart: undefined,
  gameStatus: GameStatus.IN_PROCESS,
});

describe("updateTimer", () => {
  it("put expected time", () => {
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
    const gameField = getGameField();
    const state = getState(gameField);
    return expectSaga(resetGame).withReducer(reducer, state).put(actions.reset()).hasFinalState(defaultState).run();
  });
});

describe("gameSaga", () => {
  it("full flow success", () => {
    const updateTimerTask = createMockTask();
    testSaga(gameSaga)
      .next()
      .takeEvery(authenticationSlice.actions.logout.type, resetGame)
      .next()
      .take(actions.create.type)
      .next()
      .fork(updateTimer)
      .next(updateTimerTask)
      .take(gameOver.type)
      .next()
      .cancel(updateTimerTask)
      .finish();
  });
});
