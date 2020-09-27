/* eslint-disable jest/expect-expect */

import { expectSaga } from "redux-saga-test-plan";
import { updateStateStorage } from "./StateStorage";

describe("StateStorage", () => {
  it("check updateStateStorage saga test plan", () => {
    const state = { value: "Test" };
    const stateJSON = JSON.stringify(state);
    return expectSaga(updateStateStorage).withState(state).call([localStorage, "setItem"], "STATE", stateJSON).run();
  });
});
