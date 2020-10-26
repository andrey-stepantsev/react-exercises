import Cookie from "universal-cookie";

const cookies = (cookie?: string): Cookie => new Cookie(cookie);

export const getCurrentUser = async (cookie?: string): Promise<string> => {
  return cookies(cookie).get("userName") || "";
};

export const login = async (userName: string): Promise<void> => {
  cookies().set("userName", userName);
};

export const logout = async (): Promise<void> => {
  cookies().remove("userName");
};

export const isLoggedIn = async (cookie?: string): Promise<boolean> => {
  const currentUser = await getCurrentUser(cookie);
  return Boolean(currentUser);
};
