import faker from "faker";
import { RootState } from "@/redux/store";
import { isAuthenticated } from "./selectors";

const state = {
  authentication: {
    userName: "",
  },
};

describe("isAuthenticated", () => {
  it("return true when userName.length > 0", () => {
    state.authentication.userName = faker.internet.userName();
    expect(isAuthenticated(state as RootState)).toBeTruthy();
  });
  it("return false when userName.length = 0", () => {
    state.authentication.userName = "";
    expect(isAuthenticated(state as RootState)).toBeFalsy();
  });
});
