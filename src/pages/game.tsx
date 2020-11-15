import React from "react";
import { NextPage, GetServerSideProps } from "next";
import { isLoggedIn, PlayerCard } from "@/modules/Authentication";
import { GameTemplate } from "@/modules/Game";
import { Flex } from "@/components/Container";
import { Paper } from "@/components/Paper";

const GameScreen: NextPage = () => (
  <Flex align="stretch" margin="auto">
    <Flex direction="column" align="stretch">
      <PlayerCard />
      <Paper height="100%" margin="15px 15px 0" />
    </Flex>
    <Flex direction="column">
      <GameTemplate />
    </Flex>
  </Flex>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const isLogged = await isLoggedIn(context.req?.headers.cookie);
  return isLogged ? { props: {} } : { unstable_redirect: { destination: "/", permanent: false } };
};

export default GameScreen;
