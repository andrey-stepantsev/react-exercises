import React from "react";
import { NextPage } from "next";
import { isLoggedIn, LoginForm } from "@/modules/Authentication";
import { redirect } from "@/utils/Redirect";

const LoginScreen: NextPage = () => <LoginForm />;

LoginScreen.getInitialProps = async (context) => {
  const isLogged = await isLoggedIn(context.req?.headers.cookie);
  isLogged && redirect(context, "/game");
  return {};
};

export default LoginScreen;
