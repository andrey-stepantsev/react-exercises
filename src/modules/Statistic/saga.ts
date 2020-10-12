import { SagaIterator } from "redux-saga";
import { call, take, select, put, fork, cancel, delay } from "redux-saga/effects";
import { authenticationSlice } from "../Authentication";
import { getTimeStart } from "./selectors";
import { getTime } from "./service";
import { actions } from "./slice";

export function* updateTimer(): SagaIterator {
  while (true) {
    const timeStart = yield select(getTimeStart);
    const timeNew = yield call(getTime, timeStart);
    yield put(actions.updateTime(timeNew));
    yield delay(1000);
  }
}

export function* timerSaga(): SagaIterator {
  while (true) {
    yield take(actions.startTime.type);
    const updateTimerTask = yield fork(updateTimer);
    yield take([actions.reset.type, authenticationSlice.actions.logout.type]);
    yield cancel(updateTimerTask);
  }
}
