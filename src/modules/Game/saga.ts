import { put } from "redux-saga-test-plan/matchers";
import { call, select, takeEvery } from "redux-saga/effects";
import { statisticSlice } from "../Statistic";
import { getGameField } from "./selectors";
import { actions } from "./slice";

export function* playerMove(): Generator {
  yield put(statisticSlice.actions.updateStepsCount());
  const gameField = yield select(getGameField);
  const gameFieldJSON = JSON.stringify(gameField);
  yield call([localStorage, "setItem"], "GAME_FIELD", gameFieldJSON);
}

export function* clearGameField(): Generator {
  yield call([localStorage, "removeItem"], "GAME_FIELD");
}

export function* gameSaga(): Generator {
  yield takeEvery(actions.playerMove, playerMove);
  yield takeEvery(actions.reset, clearGameField);
}
