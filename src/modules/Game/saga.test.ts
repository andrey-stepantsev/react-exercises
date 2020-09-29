/* eslint-disable jest/expect-expect */

import { expectSaga } from "redux-saga-test-plan";
import { select } from "redux-saga/effects";
import { saveGameField, clearGameField } from "./saga";
import { getGameField } from "./selectors";
import { saveField, clearField } from "./service";

const testField = [
  [3, 2],
  [1, 0],
];

describe("gameSaga", () => {
  it("check saveGameField saga test plan", () => {
    return expectSaga(saveGameField)
      .provide([[select(getGameField), testField]])
      .call(saveField, testField)
      .run();
  });
  it("check clearGameField saga test plan", () => {
    return expectSaga(clearGameField).call(clearField).run();
  });
});
