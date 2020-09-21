import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducer as user } from "./modules/User";
import { reducer as gameField, gameFieldMiddleware } from "./modules/GameField";
import { reducer as gameSettings } from "./modules/GameSettings";
import { reducer as gameTimer } from "./modules/GameTimer";
import { probabilityMiddleware } from "./modules/Probability";
import thunk from "redux-thunk";

const reducer = combineReducers({
  user,
  gameField,
  gameSettings,
  gameTimer,
});

export const store = configureStore({
  reducer,
  middleware: [thunk, gameFieldMiddleware, probabilityMiddleware],
});
