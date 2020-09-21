import { actions, reducer, defaultState, gameFieldMiddleware, GameFieldState, GameStatus } from "./GameField";

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

const setItem = jest.spyOn(Storage.prototype, "setItem");
const removeItem = jest.spyOn(Storage.prototype, "removeItem");

const dispatch = jest.fn();
const getState = jest.fn();
const next = jest.fn();

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
  it("gameFieldMiddleware saves the state to the localStorage on the playerMove action", () => {
    getState.mockReturnValueOnce(expectedTestState);
    gameFieldMiddleware({ dispatch, getState })(next)(actions.playerMove({ x: 0, y: 1 }));
    expect(setItem).toHaveBeenCalledWith("Field State", expectedTestState);
  });
  it("gameFieldMiddleware removes the state from the localStorage on the reset action", () => {
    getState.mockReturnValueOnce(expectedTestState);
    gameFieldMiddleware({ dispatch, getState })(next)(actions.reset);
    expect(removeItem).toHaveBeenCalledWith("Field State");
  });
  it("gameFieldMiddleware doesn't change the localStorage on the generate action", () => {
    getState.mockReturnValueOnce(testState);
    gameFieldMiddleware({ dispatch, getState })(next)(actions.generate(2));
    expect(setItem).not.toHaveBeenCalled();
    expect(removeItem).not.toHaveBeenCalled();
  });
});
