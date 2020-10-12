import React from "react";
import { FlexContainer } from "@/components/Container";
import { PlayerCard } from "@/modules/Authentication";
import { SettingsForm } from "@/modules/Settings";
import { GameField } from "@/modules/Game";

export const GameScreen = (): JSX.Element => (
  <>
    <FlexContainer>
      <PlayerCard />
    </FlexContainer>
    <FlexContainer>
      <SettingsForm />
    </FlexContainer>
    <FlexContainer>
      <GameField />
    </FlexContainer>
  </>
);
