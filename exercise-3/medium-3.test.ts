import { getUserOrderStates } from "./medium-3";

describe("Medium-3 test cases", () => {
  it("initial, inWork, buyingSupplies", () => {
    expect(getUserOrderStates(["initial", "inWork", "buyingSupplies"])).toEqual(["initial", "inWork"]);
  });
  it("initial, inWork, producing", () => {
    expect(getUserOrderStates(["initial", "inWork", "producing"])).toEqual(["initial", "inWork"]);
  });
  it("initial, inWork, buyingSupplies, producing", () => {
    expect(getUserOrderStates(["initial", "inWork", "buyingSupplies", "producing"])).toEqual(["initial", "inWork"]);
  });
});
