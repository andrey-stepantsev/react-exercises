import React from "react";
import { store } from "@/redux/store";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../selectors";

type RouteProps<P> = P extends Route<infer T> ? T : never;

export const AuthRoute = (props: RouteProps<Route>): JSX.Element => {
  const state = store.getState();
  return isAuthenticated(state) ? <Route {...props} /> : <Redirect to="/login" />;
};
