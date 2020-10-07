import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthRoute } from "@/modules/Authentication";
import LoginForm from "@/components/LoginForm";
import GamePageContainer from "@/containers/GamePageContainer";

export const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={LoginForm} />
      <AuthRoute path="/" component={GamePageContainer} />
    </Switch>
  </BrowserRouter>
);

export default App;
