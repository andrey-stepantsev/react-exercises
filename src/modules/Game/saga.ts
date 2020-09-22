import { call, select, takeEvery } from "redux-saga/effects";
import { getGameField } from "./selectors";
import { actions } from "./slice";

export function* saveGameField(): Generator {
  const gameField = yield select(getGameField);
  const gameFieldJSON = JSON.stringify(gameField);
  yield call([localStorage, "setItem"], "GAME_FIELD", gameFieldJSON);
}

export function* clearGameField(): Generator {
  yield call([localStorage, "removeItem"], "GAME_FIELD");
}

export function* gameSaga(): Generator {
  yield takeEvery(actions.playerMove, saveGameField);
  yield takeEvery(actions.reset, clearGameField);
}
