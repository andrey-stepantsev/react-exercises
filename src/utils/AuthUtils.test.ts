import { logIn, logOut, getCurrentUserSync, getCurrentUserAsync, isLoggedInSync, isLoggedInAsync } from "./AuthUtils";

const setItem = jest.spyOn(Storage.prototype, "setItem");
const removeItem = jest.spyOn(Storage.prototype, "removeItem");

const userName = "Test";

describe("AuthUtils", () => {
  afterEach(() => {
    localStorage.clear();
  });
  it("localStorage.setItem calls with correct parameters on LogIn", async () => {
    await logIn(userName);
    expect(setItem).toHaveBeenCalledWith("userName", userName);
  });
  it("localStorage.removeItem calls with correct parameters on LogOut", async () => {
    await logIn(userName);
    await logOut();
    expect(removeItem).toHaveBeenCalledWith("userName");
  });
  it("localStorage.getItem returns correct value", async () => {
    await logIn(userName);
    let currentUser = getCurrentUserSync();
    expect(currentUser).toBe(userName);
    currentUser = await getCurrentUserAsync();
    expect(currentUser).toBe(userName);
  });
  it("check isLoggedIn before authorization ", async () => {
    let isLoggedIn = isLoggedInSync();
    expect(isLoggedIn).toBe(false);
    isLoggedIn = await isLoggedInAsync();
    expect(isLoggedIn).toBe(false);
  });
  it("check isLoggedIn after authorization ", async () => {
    await logIn(userName);
    let isLoggedIn = isLoggedInSync();
    expect(isLoggedIn).toBe(true);
    isLoggedIn = await isLoggedInAsync();
    expect(isLoggedIn).toBe(true);
  });
});
