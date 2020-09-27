import { select, call, takeEvery } from "redux-saga/effects";

export function* updateStateStorage(): Generator {
  const state = yield select();
  const stateJSON = JSON.stringify(state);
  yield call([localStorage, "setItem"], "STATE", stateJSON);
}

export function* stateStorageSaga(): Generator {
  yield takeEvery("*", updateStateStorage);
}
