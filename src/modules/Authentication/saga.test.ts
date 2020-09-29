/* eslint-disable jest/expect-expect */

import { expectSaga } from "redux-saga-test-plan";
import { saveUserSession, clearUserSession } from "./saga";
import { actions } from "./slice";
import { login, logout } from "./service";

const testUser = "Test";

describe("authenticationSaga", () => {
  it("check save user session saga test plan with correct userName", () => {
    return expectSaga(saveUserSession, actions.login(testUser)).call(login, testUser).run();
  });
  it("check save user session saga test plan with empty userName", () => {
    return expectSaga(saveUserSession, actions.login("")).put(actions.logout).run();
  });
  it("check save user session saga test plan with space userName", () => {
    return expectSaga(saveUserSession, actions.login("   ")).put(actions.logout).run();
  });
  it("check clear user session saga test plan", () => {
    return expectSaga(clearUserSession).call(logout).run();
  });
});
