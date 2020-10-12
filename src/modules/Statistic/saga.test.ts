/* eslint-disable jest/expect-expect */

import { expectSaga } from "redux-saga-test-plan";
import { select, call } from "redux-saga/effects";
import { actions } from "./slice";
import { updateTimer } from "./saga";
import { getTimeStart } from "./selectors";
import { getTime } from "./service";

const currentTime = Date.now();
const newTime = getTime(currentTime);

describe("statisticSaga", () => {
  it("check updateTimer flow success", async () => {
    return expectSaga(updateTimer)
      .provide([
        [select(getTimeStart), currentTime],
        [call(getTime, currentTime), newTime],
      ])
      .put(actions.updateTime(newTime))
      .delay(1000)
      .silentRun();
  });
});
