import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedInSync } from "./AuthUtils";

type RouteProps<P> = P extends Route<infer T> ? T : never;

const PrivateRoute = (props: RouteProps<Route>): JSX.Element => {
  const isLoggedIn = isLoggedInSync();
  return isLoggedIn ? <Route {...props} /> : <Redirect to="/login" />;
};

export default PrivateRoute;
