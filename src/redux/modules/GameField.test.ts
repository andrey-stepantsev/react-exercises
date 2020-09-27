/* eslint-disable jest/expect-expect */

import { expectSaga } from "redux-saga-test-plan";
import { select } from "redux-saga/effects";
import {
  actions,
  reducer,
  defaultState,
  GameFieldState,
  GameStatus,
  saveGameField,
  getGameField,
  clearGameField,
} from "./GameField";

const testField = [
  [3, 2],
  [1, 0],
];

const expectedTestField = [
  [3, 2],
  [0, 1],
];

const testState: GameFieldState = {
  gameField: testField,
  gameStatus: GameStatus.STARTED,
  stepsCount: 0,
};

const expectedTestState: GameFieldState = {
  gameField: expectedTestField,
  gameStatus: GameStatus.STARTED,
  stepsCount: 1,
};

describe("GameField reducer", () => {
  it("generate creates a field of the passed size and changes the game status", () => {
    const state = reducer(defaultState, actions.generate(2));
    const rowsCount = state.gameField.length;
    const colsCount = state.gameField[0].length;
    expect(rowsCount).toBe(2);
    expect(colsCount).toBe(2);
    expect(state.gameStatus).toBe(GameStatus.STARTED);
  });
  it("playerMove changes the steps count and the empty cell position", () => {
    expect(reducer(testState, actions.playerMove({ x: 0, y: 1 }))).toEqual(expectedTestState);
  });
  it("reset returns the default state", () => {
    expect(reducer(testState, actions.reset)).toEqual(defaultState);
  });
  it("check saveGameField saga test plan", () => {
    const gameFieldJSON = JSON.stringify(testField);
    return expectSaga(saveGameField)
      .provide([[select(getGameField), testField]])
      .call([localStorage, "setItem"], "GAME_FIELD", gameFieldJSON)
      .run();
  });
  it("check clearGameField saga test plan", () => {
    return expectSaga(clearGameField).call([localStorage, "removeItem"], "GAME_FIELD").run();
  });
});
