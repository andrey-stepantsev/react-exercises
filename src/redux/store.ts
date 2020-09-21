import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducer as user, userSaga } from "./modules/User";
import { reducer as gameField, gameFieldSaga } from "./modules/GameField";
import { reducer as gameSettings } from "./modules/GameSettings";
import { reducer as gameTimer } from "./modules/GameTimer";
import { probabilityMiddleware } from "./modules/Probability";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { fork } from "redux-saga/effects";
import { stateStorageSaga } from "./modules/StateStorage";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  user,
  gameField,
  gameSettings,
  gameTimer,
});

export type RootState = ReturnType<typeof reducer>;

function* rootSaga() {
  yield fork(userSaga);
  yield fork(gameFieldSaga);
  yield fork(stateStorageSaga);
}

export const store = configureStore({
  reducer,
  middleware: [thunk, sagaMiddleware, probabilityMiddleware],
});

sagaMiddleware.run(rootSaga);
