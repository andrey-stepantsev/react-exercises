import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import LoginForm from "./LoginForm";

export default {
  title: "Login Form",
};

export const LoginFormExample: React.FC = () => (
  <MemoryRouter>
    <Route path="/">
      <LoginForm />
    </Route>
  </MemoryRouter>
);
