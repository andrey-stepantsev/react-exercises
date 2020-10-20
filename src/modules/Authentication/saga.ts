import { SagaIterator } from "redux-saga";
import { take, fork, call, put } from "redux-saga/effects";
import { settingsSlice } from "../Settings";
import { getCurrentUser, login, logout } from "./service";
import { actions } from "./slice";

export function* checkUserSession(): SagaIterator {
  const userName = yield call(getCurrentUser);
  userName.length ? yield put(actions.login(userName)) : yield put(actions.logout());
}

export function* saveUserSession(action: ReturnType<typeof actions.login>): SagaIterator {
  yield call(login, action.payload);
}

export function* clearUserSession(): SagaIterator {
  yield call(logout);
  yield put(settingsSlice.actions.reset());
}

export function* authenticationSaga(): SagaIterator {
  yield fork(checkUserSession);
  while (true) {
    const action = yield take(actions.login.type);
    yield fork(saveUserSession, action);
    yield take(actions.logout.type);
    yield fork(clearUserSession);
  }
}
