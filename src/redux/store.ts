import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { fork } from "redux-saga/effects";
import { authenticationSlice, authenticationSaga } from "@/modules/Authentication";
import { gameSlice, gameSaga } from "@/modules/Game";
import { settingsSlice } from "@/modules/Settings";
import { timerSlice } from "@/modules/Timer";
import { probabilityMiddleware } from "./modules/Probability";
import { stateStorageSaga } from "./modules/StateStorage";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  authentication: authenticationSlice.reducer,
  game: gameSlice.reducer,
  settings: settingsSlice.reducer,
  timer: timerSlice.reducer,
});

export type RootState = ReturnType<typeof reducer>;

function* rootSaga() {
  yield fork(authenticationSaga);
  yield fork(gameSaga);
  yield fork(stateStorageSaga);
}

export const store = configureStore({
  reducer,
  middleware: [thunk, sagaMiddleware, probabilityMiddleware],
});

sagaMiddleware.run(rootSaga);
