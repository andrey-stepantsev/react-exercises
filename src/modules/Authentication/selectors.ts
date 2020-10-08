import { RootState } from "@/redux/store";

export const isAuthenticated = (state: RootState): boolean => {
  return state.authentication.userName.length > 0;
};
