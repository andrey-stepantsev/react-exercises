import React from "react";
import { PlayerCard } from "@/modules/Authentication";
import { SettingsForm } from "@/modules/Settings";

export const GameScreen = (): JSX.Element => (
  <>
    <PlayerCard />
    <SettingsForm />
  </>
);
