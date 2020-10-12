/* eslint-disable jest/expect-expect */

import { expectSaga } from "redux-saga-test-plan";
import { statisticSlice } from "../Statistic";
import { playerMove } from "./saga";

describe("gameSaga", () => {
  it("check playerMove flow success", () => {
    return expectSaga(playerMove).put(statisticSlice.actions.updateStepsCount()).run();
  });
});
