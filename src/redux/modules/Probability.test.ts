import { createAction } from "@reduxjs/toolkit";
import { probabilityMiddleware } from "./Probability";

const withProbability = createAction("TEST", (probability?: number) => ({ payload: {}, meta: { probability } }));
const withoutProbability = createAction("TEST");

const dispatch = jest.fn();
const getState = jest.fn();
const next = jest.fn();

describe("probabilityMiddleware", () => {
  it("probabilityMiddleware doesn't call dispatch with 0% probability meta", () => {
    probabilityMiddleware({ dispatch, getState })(next)(withProbability(0));
    expect(next).not.toHaveBeenCalled();
  });
  it("probabilityMiddleware calls dispatch with 100% probability meta", () => {
    probabilityMiddleware({ dispatch, getState })(next)(withProbability(1));
    expect(next).toHaveBeenCalled();
  });
  it("probabilityMiddleware doesn't affect an action without probability meta", () => {
    probabilityMiddleware({ dispatch, getState })(next)(withoutProbability());
    expect(next).toHaveBeenCalled();
  });
});
