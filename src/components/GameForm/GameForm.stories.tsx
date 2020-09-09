import React from "react";
import { withKnobs, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { GameSettings } from "types/GameTypes";
import { GameMode } from "enums/GameEnums";
import GameForm from "./GameForm";

export default {
  title: "Game Form",
  decorators: [withKnobs],
};

const settings: GameSettings = {
  gameMode: GameMode.FREE,
  fieldSize: 2,
};

export const GameFormExample: React.FC = () => (
  <GameForm initialValues={object("settings", settings)} onSubmit={action("onSubmit")} onReset={action("onReset")} />
);
