import { RootState } from "@/redux/store";

export const isAuthenticated = (state: RootState): boolean => Boolean(state.authentication.userName);
