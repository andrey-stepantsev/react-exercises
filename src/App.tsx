import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "utils/PrivateRoute";
import LoginForm from "components/LoginForm";
import GamePageContainer from "containers/GamePageContainer";

export const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={LoginForm} />
      <PrivateRoute path="/" component={GamePageContainer} />
    </Switch>
  </BrowserRouter>
);

export default App;
