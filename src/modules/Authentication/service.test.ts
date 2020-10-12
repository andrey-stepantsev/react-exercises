import Cookie from "universal-cookie";
import { getCurrentUser, login, logout, isLoggedIn, cookies } from "./service";

const set = jest.spyOn(Cookie.prototype, "set");
const remove = jest.spyOn(Cookie.prototype, "remove");

const userName = "Test";

describe("authenticationService", () => {
  afterEach(() => {
    cookies().remove("userName");
  });
  it("login calls the cookies.set with correct userName", async () => {
    await login(userName);
    expect(set).toHaveBeenCalledWith("userName", userName);
  });
  it("logout calls the cookies.remove with correct userName", async () => {
    await login(userName);
    await logout();
    expect(remove).toHaveBeenCalledWith("userName");
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
