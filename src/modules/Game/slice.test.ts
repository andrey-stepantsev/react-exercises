import { actions, reducer, defaultState, GameState, GameStatus, UpdateData } from "./slice";

const testField = [
  [3, 2],
  [1, 0],
];

const testFieldExpected = [
  [3, 2],
  [0, 1],
];

const updateData: UpdateData = {
  coordinates: { x: 0, y: 1 },
  blank: { blankX: 1, blankY: 1 },
};

const gameState: GameState = {
  gameField: testField,
  gameStatus: GameStatus.STARTED,
};

const gameStateExpected: GameState = {
  gameField: testFieldExpected,
  gameStatus: GameStatus.STARTED,
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
  it("update reducer updates the field", () => {
    expect(reducer(gameState, actions.update(updateData))).toEqual(gameStateExpected);
  });
  it("reset reducer returns the default state", () => {
    expect(reducer(gameState, actions.reset)).toEqual(defaultState);
  });
});
