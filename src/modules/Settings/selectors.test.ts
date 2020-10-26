import { RootState } from "@/redux/store";
import { getFieldSize } from "./selectors";

type StateType = {
  settings: {
    fieldSize: number | undefined;
  };
};

const state: StateType = {
  settings: {
    fieldSize: undefined,
  },
};

describe("getFieldSize", () => {
  it("return fieldSize when fieldSize is not undefined", () => {
    state.settings.fieldSize = 4;
    expect(getFieldSize(state as RootState)).toBe(4);
  });
  it("return undefined when fieldSize is undefined", () => {
    state.settings.fieldSize = undefined;
    expect(getFieldSize(state as RootState)).toBeUndefined();
  });
});
