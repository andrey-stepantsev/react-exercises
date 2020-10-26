/* eslint-disable jest/expect-expect */

import { expectSaga, testSaga } from "redux-saga-test-plan";
import { select } from "redux-saga-test-plan/matchers";
import { settingsSaga, startGame, stopGame } from "./saga";
import { getFieldSize } from "./selectors";
import { gameSlice } from "../Game";
import { statisticSlice } from "../Statistic";
import { actions } from "./slice";

const fieldSize = 4;

describe("startGame", () => {
  it("full flow success", () => {
    return expectSaga(startGame)
      .provide([[select(getFieldSize), fieldSize]])
      .put(gameSlice.actions.generate(fieldSize))
      .put(statisticSlice.actions.startTime())
      .run();
  });
});

describe("stopGame", () => {
  it("full flow success", () => {
    return expectSaga(stopGame).put(gameSlice.actions.reset()).put(statisticSlice.actions.reset()).run();
  });
});

describe("settingsSaga", () => {
  it("full flow success", () => {
    testSaga(settingsSaga)
      .next()
      .take(actions.update.type)
      .next()
      .fork(startGame)
      .next()
      .take(actions.reset.type)
      .next()
      .fork(stopGame)
      .finish();
  });
});
