import { actions, reducer, defaultState, GameState, GameStatus } from "./slice";

const testField = [
  [3, 2],
  [1, 0],
];

const expectedTestField = [
  [3, 2],
  [0, 1],
];

const testState: GameState = {
  gameField: testField,
  gameStatus: GameStatus.STARTED,
  stepsCount: 0,
};

const expectedTestState: GameState = {
  gameField: expectedTestField,
  gameStatus: GameStatus.STARTED,
  stepsCount: 1,
};

describe("gameSlice", () => {
  it("generate reducer creates a field of the passed size and changes the game status", () => {
    const state = reducer(defaultState, actions.generate(2));
    const rowsCount = state.gameField.length;
    const colsCount = state.gameField[0].length;
    expect(rowsCount).toBe(2);
    expect(colsCount).toBe(2);
    expect(state.gameStatus).toBe(GameStatus.STARTED);
  });
  it("playerMove reducer changes the steps count and the empty cell position", () => {
    expect(reducer(testState, actions.playerMove({ x: 0, y: 1 }))).toEqual(expectedTestState);
  });
  it("reset reducer returns the default state", () => {
    expect(reducer(testState, actions.reset)).toEqual(defaultState);
  });
});
