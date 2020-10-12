import React from "react";
import { NextPage } from "next";
import { FlexContainer } from "@/components/Container";
import { LoginForm, isLoggedIn } from "@/modules/Authentication";
import { redirect } from "@/utils/Redirect";

const LoginScreen: NextPage = () => (
  <FlexContainer>
    <LoginForm />
  </FlexContainer>
);

LoginScreen.getInitialProps = async (context) => {
  const isLogged = await isLoggedIn(context.req?.headers.cookie);
  isLogged && redirect(context, "/game");
  return {};
};

export default LoginScreen;
