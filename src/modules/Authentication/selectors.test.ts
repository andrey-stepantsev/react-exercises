import faker from "faker";
import { RootState } from "@/redux/store";
import { isAuthenticated } from "./selectors";

const getState = (userName: string) => ({
  authentication: {
    userName,
  },
});

describe("isAuthenticated", () => {
  it("return true when userName.length > 0", () => {
    const userName = faker.internet.userName();
    const state = getState(userName);
    expect(isAuthenticated(state as RootState)).toBeTruthy();
  });
  it("return false when userName.length = 0", () => {
    const state = getState("");
    expect(isAuthenticated(state as RootState)).toBeFalsy();
  });
});
