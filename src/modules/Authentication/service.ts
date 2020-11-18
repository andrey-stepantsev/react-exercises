import Cookies from "js-cookie";

export const getCurrentUser = async (): Promise<string> => {
  return Cookies.get("userName") || "";
};

export const login = async (userName: string): Promise<void> => {
  Cookies.set("userName", userName);
};

export const logout = async (): Promise<void> => {
  Cookies.remove("userName");
};

export const isLoggedIn = async (): Promise<boolean> => {
  const currentUser = await getCurrentUser();
  return Boolean(currentUser);
};
