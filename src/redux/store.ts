import createSagaMiddleware from "redux-saga";
import { fork } from "redux-saga/effects";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper, MakeStore } from "next-redux-wrapper";
import { authenticationSlice, authenticationSaga } from "@/modules/Authentication";
import { gameSlice, gameSaga } from "@/modules/Game";

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield fork(authenticationSaga);
  yield fork(gameSaga);
}

export const reducer = combineReducers({
  authentication: authenticationSlice.reducer,
  game: gameSlice.reducer,
});

export type RootState = ReturnType<typeof reducer>;

export const makeStore: MakeStore<RootState> = () => {
  const store = configureStore({ reducer, middleware: [sagaMiddleware] });
  sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper<RootState>(makeStore, { debug: true });
