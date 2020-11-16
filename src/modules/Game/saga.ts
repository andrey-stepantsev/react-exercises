import { SagaIterator } from "redux-saga";
import { call, cancel, delay, fork, put, select, take, takeEvery } from "redux-saga/effects";
import { getTime } from "@/utils/Time";
import { authenticationSlice } from "@/modules/Authentication";
import { getTimerStart } from "./selectors";
import { actions, gameOver } from "./slice";

export function* updateTimer(): SagaIterator {
  while (true) {
    const timerStart = yield select(getTimerStart);
    const timerNew = yield call(getTime, timerStart);
    yield put(actions.updateTimer(timerNew));
    yield delay(1000);
  }
}

export function* resetGame(): SagaIterator {
  yield put(actions.reset());
}

export function* gameSaga(): SagaIterator {
  yield takeEvery(authenticationSlice.actions.logout.type, resetGame);
  while (true) {
    yield take(actions.create.type);
    const updateTimerTask = yield fork(updateTimer);
    yield take(gameOver.type);
    yield cancel(updateTimerTask);
  }
}
