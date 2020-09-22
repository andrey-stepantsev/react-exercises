import { getCurrentUser, login, logout, isLoggedIn } from "./service";

const setItem = jest.spyOn(Storage.prototype, "setItem");
const removeItem = jest.spyOn(Storage.prototype, "removeItem");

const userName = "Test";

describe("authenticationService", () => {
  afterEach(() => {
    localStorage.clear();
  });
  it("login calls the localStorage.setItem with correct userName", async () => {
    await login(userName);
    expect(setItem).toHaveBeenCalledWith("userName", userName);
  });
  it("logout calls the localStorage.removeItem with correct userName", async () => {
    await login(userName);
    await logout();
    expect(removeItem).toHaveBeenCalledWith("userName");
  });
  it("getCurrentUser returns current userName", async () => {
    await login(userName);
    const currentUser = await getCurrentUser();
    expect(currentUser).toBe(userName);
  });
  it("isLoggedIn before authorization equals false", async () => {
    const isLogged = await isLoggedIn();
    expect(isLogged).toBe(false);
  });
  it("isLoggedIn after authorization equals true", async () => {
    await login(userName);
    const isLogged = await isLoggedIn();
    expect(isLogged).toBe(true);
  });
});
