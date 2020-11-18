import { RootState } from "@/redux/store";

export const isAuthenticated = (state: RootState): boolean => state.authentication.userName.length > 0;
