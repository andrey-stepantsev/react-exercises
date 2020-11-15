import React from "react";
import { NextPage, GetServerSideProps } from "next";
import { isLoggedIn, LoginForm } from "@/modules/Authentication";
import { Flex } from "@/components/Container";

const LoginScreen: NextPage = () => (
  <Flex margin="auto">
    <LoginForm />
  </Flex>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const isLogged = await isLoggedIn(context.req?.headers.cookie);
  return isLogged ? { unstable_redirect: { destination: "/game", permanent: false } } : { props: {} };
};

export default LoginScreen;
