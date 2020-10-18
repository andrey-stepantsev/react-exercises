/* eslint-disable jest/expect-expect */

import { expectSaga } from "redux-saga-test-plan";
import { call, select } from "redux-saga/effects";
import { statisticSlice } from "../Statistic";
import { checkGameField } from "./saga";
import { getGameField } from "./selectors";
import { getBlank } from "./service";
import { actions, Blank, Coordinates, playerMove } from "./slice";

const testField = [
  [3, 2],
  [1, 0],
];

const coordinatesFirst: Coordinates = {
  x: 0,
  y: 1,
};

const coordinatesSecond: Coordinates = {
  x: 0,
  y: 0,
};

const blank: Blank = {
  blankX: 1,
  blankY: 1,
};

describe("gameSaga", () => {
  it("check checkGameField with correct player move flow success", () => {
    return expectSaga(checkGameField, playerMove(coordinatesFirst))
      .provide([
        [select(getGameField), testField],
        [call(getBlank, testField), blank],
      ])
      .put(actions.update({ coordinates: coordinatesFirst, blank }))
      .put(statisticSlice.actions.updateStepsCount())
      .run();
  });
  it("check checkGameField with incorrect player move flow success", () => {
    return expectSaga(checkGameField, playerMove(coordinatesSecond))
      .provide([
        [select(getGameField), testField],
        [call(getBlank, testField), blank],
      ])
      .not.put(actions.update({ coordinates: coordinatesSecond, blank }))
      .not.put(statisticSlice.actions.updateStepsCount())
      .run();
  });
});
