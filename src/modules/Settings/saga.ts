import { SagaIterator } from "redux-saga";
import { fork, put, select, take } from "redux-saga/effects";
import { gameSlice } from "../Game";
import { statisticSlice } from "../Statistic";
import { getFieldSize } from "./selectors";
import { actions } from "./slice";

export function* startGame(): SagaIterator {
  const fieldSize = yield select(getFieldSize);
  yield put(gameSlice.actions.generate(fieldSize));
  yield put(statisticSlice.actions.startTime());
}

export function* stopGame(): SagaIterator {
  yield put(gameSlice.actions.reset());
  yield put(statisticSlice.actions.reset());
}

export function* settingsSaga(): SagaIterator {
  while (true) {
    yield take(actions.update.type);
    yield fork(startGame);
    yield take(actions.reset.type);
    yield fork(stopGame);
  }
}
