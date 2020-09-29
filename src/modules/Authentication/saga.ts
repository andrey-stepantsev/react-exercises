import { takeEvery, call, put } from "redux-saga/effects";
import { login, logout } from "./service";
import { actions } from "./slice";

export function* saveUserSession(action: ReturnType<typeof actions.login>): Generator {
  const userName = action.payload;
  userName.trim().length ? yield call(login, userName) : yield put(actions.logout);
}

export function* clearUserSession(): Generator {
  yield call(logout);
}

export function* authenticationSaga(): Generator {
  yield takeEvery(actions.login, saveUserSession);
  yield takeEvery(actions.logout, clearUserSession);
}
