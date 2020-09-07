export const getCurrentUserSync = (): string => {
  return localStorage.getItem("userName") || "";
};

export const getCurrentUserAsync = async (): Promise<string> => {
  return getCurrentUserSync();
};

export const logIn = async (userName: string): Promise<void> => {
  localStorage.setItem("userName", userName);
};

export const logOut = async (): Promise<void> => {
  localStorage.removeItem("userName");
};

export const isLoggedInSync = (): boolean => {
  const curentUser = getCurrentUserSync();
  return Boolean(curentUser);
};

export const isLoggedInAsync = async (): Promise<boolean> => {
  const curentUser = await getCurrentUserAsync();
  return Boolean(curentUser);
};
