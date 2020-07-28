import { Order, getOrderState } from "./easy-2";

const initial: Order = {
  state: "initial",
  sum: 5,
};

const inWork: Order = {
  state: "inWork",
  sum: 5,
  workerId: 1,
};

const buyingSupplies: Order = {
  state: "buyingSupplies",
  sum: 5,
  workerId: 1,
  suppliesSum: 10,
};

const producing: Order = {
  state: "producing",
  sum: 5,
  workerId: 1,
  suppliesSum: 10,
  produceEstimate: new Date(),
};

const fullfilled: Order = {
  state: "fullfilled",
  sum: 5,
  workerId: 1,
  suppliesSum: 10,
  produceEstimate: new Date(),
  fullfillmentDate: new Date(),
};

describe("Easy-2 test cases", () => {
  it("initial", () => expect(getOrderState(initial)).toBe("initial"));
  it("inWork", () => expect(getOrderState(inWork)).toBe("inWork"));
  it("buyingSupplies", () => expect(getOrderState(buyingSupplies)).toBe("buyingSupplies"));
  it("producing", () => expect(getOrderState(producing)).toBe("producing"));
  it("fullfilled", () => expect(getOrderState(fullfilled)).toBe("fullfilled"));
});
