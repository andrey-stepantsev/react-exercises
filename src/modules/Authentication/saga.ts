import { SagaIterator } from "redux-saga";
import { takeEvery, call, put, fork } from "redux-saga/effects";
import { getCurrentUser, login, logout } from "./service";
import { actions } from "./slice";

export function* checkUserSession(): SagaIterator {
  const userName = yield call(getCurrentUser);
  if (userName.length) {
    yield put(actions.login(userName));
  } else {
    yield put(actions.logout());
    yield fork(clearUserSession);
  }
}

export function* saveUserSession(action: ReturnType<typeof actions.login>): Generator {
  const userName = action.payload;
  userName.trim().length ? yield call(login, userName) : yield put(actions.logout);
}

export function* clearUserSession(): SagaIterator {
  yield call(logout);
}

export function* authenticationSaga(): Generator {
  yield fork(checkUserSession);
  yield takeEvery(actions.login, saveUserSession);
  yield takeEvery(actions.logout, clearUserSession);
}
