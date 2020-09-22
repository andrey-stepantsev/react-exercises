import { takeEvery, call } from "redux-saga/effects";
import { login, logout } from "./service";
import { actions } from "./slice";

export function* saveUserSession(action: ReturnType<typeof actions.login>): Generator {
  yield call(login, action.payload);
}

export function* clearUserSession(): Generator {
  yield call(logout);
}

export function* authenticationSaga(): Generator {
  yield takeEvery(actions.login, saveUserSession);
  yield takeEvery(actions.logout, clearUserSession);
}
