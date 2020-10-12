/* eslint-disable jest/expect-expect */

import { expectSaga } from "redux-saga-test-plan";
import { saveUserSession, clearUserSession } from "./saga";
import { actions } from "./slice";
import { login, logout } from "./service";
import { settingsSlice } from "../Settings";

const testUser = "Test";

describe("authenticationSaga", () => {
  it("check saveUserSession flow success", () => {
    return expectSaga(saveUserSession, actions.login(testUser)).call(login, testUser).run();
  });
  it("check clearUserSession flow success", () => {
    return expectSaga(clearUserSession).call(logout).put(settingsSlice.actions.reset()).run();
  });
});
