import React from "react";
import { FlexContainer } from "@/components/Container";
import { LoginForm } from "@/modules/Authentication";

export const LoginScreen = (): JSX.Element => (
  <FlexContainer>
    <LoginForm />
  </FlexContainer>
);
