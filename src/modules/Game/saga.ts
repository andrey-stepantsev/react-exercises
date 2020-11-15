import { cloneDeep, isEqual } from "lodash";
import { SagaIterator } from "redux-saga";
import { call, cancel, delay, fork, put, select, take, takeEvery } from "redux-saga/effects";
import { authenticationSlice } from "../Authentication";
import { getGameField, getTimerStart } from "./selectors";
import { clearMergeStatus, getCoordinates, getNext, setRandom } from "./service";
import { actions, merge } from "./slice";
import { ICell, ICoordinate, ICoordinates } from "./interface";
import { getTime } from "@/utils/Time";

export function* makeMerge(action: ReturnType<typeof merge>): SagaIterator {
  const gameField: ICell[][] = yield select(getGameField);
  const arrCopy: ICell[][] = yield call(cloneDeep, gameField);

  const vector: ICoordinate = action.payload;
  const { Xs, Ys }: ICoordinates = yield call(getCoordinates, arrCopy, vector);

  let score = 0;
  let isUpdated = false;

  for (const y of Ys) {
    for (const x of Xs) {
      const currentCell = arrCopy[y][x];
      const currentCoordinate = { x, y };
      const currentValue = currentCell.value;
      if (currentValue !== 0) {
        const nextCoordinate: ICoordinate = yield call(getNext, arrCopy, currentCoordinate, vector);
        if (!isEqual(nextCoordinate, currentCoordinate)) {
          const nextCell = arrCopy[nextCoordinate.y][nextCoordinate.x];
          const nextValue = nextCell.value;
          nextCell.value = nextValue + currentValue;
          nextCell.isMerged = nextValue === currentValue;
          nextCell.isMerged && (score += nextCell.value);
          currentCell.value = 0;
          isUpdated = true;
        }
      }
    }
  }

  yield call(clearMergeStatus, arrCopy);

  if (isUpdated) {
    const isSetted: boolean = yield call(setRandom, arrCopy);
    if (isSetted) yield put(actions.update({ gameField: arrCopy, score }));
  }
}

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
  yield takeEvery(merge.type, makeMerge);
  while (true) {
    yield take(actions.create.type);
    const updateTimerTask = yield fork(updateTimer);
    yield take(authenticationSlice.actions.logout.type);
    yield cancel(updateTimerTask);
    yield fork(resetGame);
  }
}
