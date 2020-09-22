import { actions, reducer, defaultState } from "./slice";

const testUser = "Test";

describe("authenticationSlice", () => {
  it("login reducer sets the passed username to the state", () => {
    expect(reducer(defaultState, actions.login(testUser))).toEqual({ userName: testUser });
  });
  it("logout reducer returns the default state", () => {
    expect(reducer({ userName: testUser }, actions.logout)).toEqual(defaultState);
  });
});
