import React from "react";
import { NextPage } from "next";
import { FlexContainer, Row } from "@/components/Container";
import { PlayerCard, isLoggedIn } from "@/modules/Authentication";
import { SettingsForm } from "@/modules/Settings";
import { GameField } from "@/modules/Game";
import { redirect } from "@/utils/Redirect";

const GameScreen: NextPage = () => (
  <>
    <FlexContainer>
      <Row>
        <PlayerCard />
      </Row>
      <Row>
        <SettingsForm />
      </Row>
      <Row>
        <GameField />
      </Row>
    </FlexContainer>
  </>
);

GameScreen.getInitialProps = async (context) => {
  const isLogged = await isLoggedIn(context.req?.headers.cookie);
  !isLogged && redirect(context, "/");
  return {};
};

export default GameScreen;
