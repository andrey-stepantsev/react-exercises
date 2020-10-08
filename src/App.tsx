import React from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthRoute } from "@/modules/Authentication";
import { LoginScreen, GameScreen } from "@/screens";

export const App = (): JSX.Element => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginScreen} />
        <AuthRoute path="/" component={GameScreen} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
