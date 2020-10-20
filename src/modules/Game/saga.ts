import { SagaIterator } from "redux-saga";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { statisticSlice } from "../Statistic";
import { getGameField } from "./selectors";
import { getBlank, checkPlayerClick } from "./service";
import { actions, playerMove } from "./slice";

export function* checkGameField(action: ReturnType<typeof playerMove>): SagaIterator {
  const coordinates = action.payload;
  const gameField = yield select(getGameField);
  const blank = yield call(getBlank, gameField);
  const isValidMove = yield call(checkPlayerClick, coordinates, blank);
  if (isValidMove) {
    yield put(actions.update({ coordinates, blank }));
    yield put(statisticSlice.actions.updateStepsCount());
  }
}

export function* gameSaga(): Generator {
  yield takeEvery(playerMove.type, checkGameField);
}
