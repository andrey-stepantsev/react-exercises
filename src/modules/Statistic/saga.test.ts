/* eslint-disable jest/expect-expect */

import { expectSaga, testSaga } from "redux-saga-test-plan";
import { select, call } from "redux-saga-test-plan/matchers";
import { createMockTask } from "@redux-saga/testing-utils";
import { actions } from "./slice";
import { timerSaga, updateTimer } from "./saga";
import { getTime } from "./service";
import { getTimeStart } from "./selectors";

const currentTime = Date.now();
const newTime = getTime(currentTime);

describe("updateTimer", () => {
  it("full flow success", () => {
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

describe("timerSaga", () => {
  it("full flow success", () => {
    const updateTimerTask = createMockTask();
    testSaga(timerSaga)
      .next()
      .take(actions.startTime.type)
      .next()
      .fork(updateTimer)
      .next(updateTimerTask)
      .take(actions.reset.type)
      .next()
      .cancel(updateTimerTask)
      .finish();
  });
});
