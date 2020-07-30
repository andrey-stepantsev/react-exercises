import { Order, filterOnlyInitialAndInWorkOrder } from "./medium-1";

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

describe("Medium-1 test cases", () => {
  it("initial should be returned", () => {
    expect(filterOnlyInitialAndInWorkOrder(initial)).toEqual(initial);
  });
  it("inWork should be returned", () => {
    expect(filterOnlyInitialAndInWorkOrder(inWork)).toEqual(inWork);
  });
  it("buyingSupplies shouldn't be returned", () => {
    expect(filterOnlyInitialAndInWorkOrder(buyingSupplies)).toBeNull();
  });
  it("producing shouldn't be returned", () => {
    expect(filterOnlyInitialAndInWorkOrder(producing)).toBeNull();
  });
  it("fullfilled shouldn't be returned", () => {
    expect(filterOnlyInitialAndInWorkOrder(fullfilled)).toBeNull();
  });
});
