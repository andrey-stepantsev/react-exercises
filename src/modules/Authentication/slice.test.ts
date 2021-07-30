import faker from "faker";
import { actions, reducer, defaultState } from "./slice";

const userName = faker.internet.userName();

describe("defaultState", () => {
  it("expected default state", () => {
    const state = { ...defaultState };
    expect(state.userName).toHaveLength(0);
  });
});

describe("login", () => {
  it("set userName to the state", () => {
    expect(reducer(defaultState, actions.login(userName))).toEqual({ userName });
  });
});

describe("logout", () => {
  it("return default state", () => {
    expect(reducer({ userName }, actions.logout())).toEqual(defaultState);
  });
});
