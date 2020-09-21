import { actions, reducer, defaultState } from "./User";

const testUser = "Test";

describe("User reducer", () => {
  it("login sets the passed username to the state", () => {
    expect(reducer(defaultState, actions.login(testUser))).toEqual({ userName: testUser });
  });
  it("logout returns the default state", () => {
    expect(reducer({ userName: testUser }, actions.logout)).toEqual(defaultState);
  });
});
