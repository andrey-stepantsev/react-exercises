import createSagaMiddleware from "redux-saga";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper, MakeStore } from "next-redux-wrapper";
import { fork } from "redux-saga/effects";
import { authenticationSlice, authenticationSaga } from "@/modules/Authentication";
import { gameSlice, gameSaga } from "@/modules/Game";
import { settingsSlice, settingsSaga } from "@/modules/Settings";
import { statisticSlice, timerSaga } from "@/modules/Statistic";

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield fork(authenticationSaga);
  yield fork(gameSaga);
  yield fork(settingsSaga);
  yield fork(timerSaga);
}

export const reducer = combineReducers({
  authentication: authenticationSlice.reducer,
  game: gameSlice.reducer,
  settings: settingsSlice.reducer,
  statistic: statisticSlice.reducer,
});

export type RootState = ReturnType<typeof reducer>;

export const makeStore: MakeStore<RootState> = () => {
  const store = configureStore({ reducer, middleware: [sagaMiddleware] });
  sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper<RootState>(makeStore, { debug: true });
