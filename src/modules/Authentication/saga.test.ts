/* eslint-disable jest/expect-expect */

import faker from "faker";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import { call } from "redux-saga-test-plan/matchers";
import { settingsSlice } from "../Settings";
import { checkUserSession, saveUserSession, clearUserSession, authenticationSaga } from "./saga";
import { actions } from "./slice";
import { getCurrentUser, login, logout } from "./service";

const userName = faker.internet.userName();

describe("checkUserSession", () => {
  it("put login when user is in session", () => {
    return expectSaga(checkUserSession)
      .provide([[call(getCurrentUser), userName]])
      .put(actions.login(userName))
      .run();
  });
  it("put logout when user is not in session", () => {
    return expectSaga(checkUserSession)
      .provide([[call(getCurrentUser), ""]])
      .put(actions.logout())
      .run();
  });
});

describe("saveUserSession", () => {
  it("call login with passed userName", () => {
    return expectSaga(saveUserSession, actions.login(userName)).call(login, userName).run();
  });
});

describe("clearUserSession", () => {
  it("call logout and put settings reset", () => {
    return expectSaga(clearUserSession).call(logout).put(settingsSlice.actions.reset()).run();
  });
});

describe("authenticationSaga", () => {
  it("full flow success", () => {
    testSaga(authenticationSaga)
      .next()
      .fork(checkUserSession)
      .next()
      .take(actions.login.type)
      .next(actions.login(userName))
      .fork(saveUserSession, { type: actions.login.type, payload: userName })
      .next()
      .take(actions.logout.type)
      .next()
      .fork(clearUserSession)
      .finish();
  });
});
