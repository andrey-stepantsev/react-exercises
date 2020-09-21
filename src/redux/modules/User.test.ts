/* eslint-disable jest/expect-expect */

import { expectSaga } from "redux-saga-test-plan";
import { actions, reducer, defaultState, saveUserSession, clearUserSession } from "./User";
import { logIn, logOut } from "utils/AuthUtils";

const testUser = "Test";

describe("User reducer", () => {
  it("login sets the passed username to the state", () => {
    expect(reducer(defaultState, actions.login(testUser))).toEqual({ userName: testUser });
  });
  it("logout returns the default state", () => {
    expect(reducer({ userName: testUser }, actions.logout)).toEqual(defaultState);
  });
  it("check save user session saga test plan", () => {
    expectSaga(saveUserSession, actions.login(testUser)).call(logIn, testUser).run();
  });
  it("check clear user session saga test plan", () => {
    expectSaga(clearUserSession).call(logOut).run();
  });
});
