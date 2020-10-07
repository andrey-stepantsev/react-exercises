import { SagaIterator } from "redux-saga";
import { call, select, takeEvery } from "redux-saga/effects";
import { getGameField } from "./selectors";
import { actions } from "./slice";
import { saveField, clearField } from "./service";

export function* saveGameField(): SagaIterator<void> {
  const gameField = yield select(getGameField);
  yield call(saveField, gameField);
}

export function* clearGameField(): Generator {
  yield call(clearField);
}

export function* gameSaga(): Generator {
  yield takeEvery(actions.playerMove, saveGameField);
  yield takeEvery(actions.reset, clearGameField);
}
