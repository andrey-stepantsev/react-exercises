import { RootState } from "@/redux/store";
import { getGameField } from "./selectors";

const gameField = [
  [1, 2],
  [3, 0],
];

const state = {
  game: {
    gameField,
  },
};

describe("getGameField", () => {
  it("return current gameField", () => {
    expect(getGameField(state as RootState)).toEqual(gameField);
  });
});
