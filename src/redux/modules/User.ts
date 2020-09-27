import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { takeEvery, call } from "redux-saga/effects";
import { logIn, logOut } from "@/utils/AuthUtils";

export type UserState = {
  userName: string | undefined;
};

export const defaultState: UserState = {
  userName: undefined,
};

const user = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
      return state;
    },
    logout: () => {
      return defaultState;
    },
  },
});

export function* saveUserSession(action: ReturnType<typeof user.actions.login>): Generator {
  yield call(logIn, action.payload);
}

export function* clearUserSession(): Generator {
  yield call(logOut);
}

export function* userSaga(): Generator {
  yield takeEvery(user.actions.login, saveUserSession);
  yield takeEvery(user.actions.logout, clearUserSession);
}

export const { actions, reducer } = user;
