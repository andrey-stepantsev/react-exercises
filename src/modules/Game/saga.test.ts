/* eslint-disable jest/expect-expect */

import { expectSaga, testSaga } from "redux-saga-test-plan";
import { select, call } from "redux-saga-test-plan/matchers";
import { statisticSlice } from "../Statistic";
import { checkGameField, gameSaga } from "./saga";
import { getGameField } from "./selectors";
import { getBlank } from "./service";
import { actions, playerMove, Blank, Coordinates } from "./slice";

const gameField = [
  [3, 2],
  [1, 0],
];

const blank: Blank = {
  blankX: 1,
  blankY: 1,
};

const coordinatesFirst: Coordinates = {
  x: 0,
  y: 1,
};

const coordinatesSecond: Coordinates = {
  x: 0,
  y: 0,
};

describe("checkGameField", () => {
  it("valid player move flow success", () => {
    return expectSaga(checkGameField, playerMove(coordinatesFirst))
      .provide([
        [select(getGameField), gameField],
        [call(getBlank, gameField), blank],
      ])
      .put(actions.update({ coordinates: coordinatesFirst, blank }))
      .put(statisticSlice.actions.updateStepsCount())
      .run();
  });
  it("invalid player move flow success", () => {
    return expectSaga(checkGameField, playerMove(coordinatesSecond))
      .provide([
        [select(getGameField), gameField],
        [call(getBlank, gameField), blank],
      ])
      .not.put(actions.update({ coordinates: coordinatesSecond, blank }))
      .not.put(statisticSlice.actions.updateStepsCount())
      .run();
  });
});

describe("gameSaga", () => {
  it("full flow success", () => {
    testSaga(gameSaga).next().takeEvery(playerMove.type, checkGameField).finish();
  });
});
