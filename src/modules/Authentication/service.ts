export const getCurrentUser = async (): Promise<string> => {
  return localStorage.getItem("userName") || "";
};

export const login = async (userName: string): Promise<void> => {
  localStorage.setItem("userName", userName);
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem("userName");
};

export const isLoggedIn = async (): Promise<boolean> => {
  const currentUser = await getCurrentUser();
  return Boolean(currentUser);
};
