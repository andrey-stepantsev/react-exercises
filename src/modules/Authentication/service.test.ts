import faker from "faker";
import Cookie from "universal-cookie";
import { getCurrentUser, login, logout, isLoggedIn } from "./service";

const set = jest.spyOn(Cookie.prototype, "set");
const remove = jest.spyOn(Cookie.prototype, "remove");

const userName = faker.internet.userName();

describe("getCurrentUser", () => {
  it("return current userName when user is authenticated", async () => {
    await login(userName);
    const currentUser = await getCurrentUser();
    expect(currentUser).toBe(userName);
    await logout();
  });
  it("return empty string when user is not authenticated", async () => {
    const currentUser = await getCurrentUser();
    expect(currentUser).toBe("");
  });
});

describe("login", () => {
  it("set cookie with userName", async () => {
    await login(userName);
    expect(set).toHaveBeenCalledWith("userName", userName);
    await logout();
  });
});

describe("logout", () => {
  it("remove cookie with userName", async () => {
    await logout();
    expect(remove).toHaveBeenCalledWith("userName");
  });
});

describe("isLoggedIn", () => {
  it("return true when user is authenticated", async () => {
    await login(userName);
    const isLogged = await isLoggedIn();
    expect(isLogged).toBeTruthy();
    await logout();
  });
  it("return false when user is not authenticated", async () => {
    const isLogged = await isLoggedIn();
    expect(isLogged).toBeFalsy();
  });
});
