/* eslint-disable jest/expect-expect */

import { expectSaga } from "redux-saga-test-plan";
import { select } from "redux-saga/effects";
import { saveGameField, clearGameField } from "./saga";
import { getGameField } from "./selectors";

const testField = [
  [3, 2],
  [1, 0],
];

const testFieldJSON = JSON.stringify(testField);

describe("gameSaga", () => {
  it("check saveGameField saga test plan", () => {
    return expectSaga(saveGameField)
      .provide([[select(getGameField), testField]])
      .call([localStorage, "setItem"], "GAME_FIELD", testFieldJSON)
      .run();
  });
  it("check clearGameField saga test plan", () => {
    return expectSaga(clearGameField).call([localStorage, "removeItem"], "GAME_FIELD").run();
  });
});
