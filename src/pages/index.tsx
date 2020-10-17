import React from "react";
import { NextPage } from "next";
import { FlexContainer, Row } from "@/components/Container";
import { LoginForm, isLoggedIn } from "@/modules/Authentication";
import { redirect } from "@/utils/Redirect";

const LoginScreen: NextPage = () => (
  <FlexContainer>
    <Row>
      <LoginForm />
    </Row>
  </FlexContainer>
);

LoginScreen.getInitialProps = async (context) => {
  const isLogged = await isLoggedIn(context.req?.headers.cookie);
  isLogged && redirect(context, "/game");
  return {};
};

export default LoginScreen;
