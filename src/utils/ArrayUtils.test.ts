import { shuffle } from "./ArrayUtils";

describe("Shuffle test cases", () => {
  it("the shuffeled array has the same length", () => {
    const testArray = [1, 2, 3];
    const testArrayLength = testArray.length;
    shuffle(testArray);
    expect(testArray.length).toBe(testArrayLength);
  });
  it("the shuffeled array contains the same values", () => {
    const values = [1, 2, 3];
    const testArray = [...values];
    shuffle(testArray);
    expect(testArray).toEqual(expect.arrayContaining(values));
  });
});
