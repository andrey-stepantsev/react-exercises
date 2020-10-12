import { put } from "redux-saga-test-plan/matchers";
import { takeEvery } from "redux-saga/effects";
import { statisticSlice } from "../Statistic";
import { actions } from "./slice";

export function* playerMove(): Generator {
  yield put(statisticSlice.actions.updateStepsCount());
}

export function* gameSaga(): Generator {
  yield takeEvery(actions.playerMove.type, playerMove);
}
