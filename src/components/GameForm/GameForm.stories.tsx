import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { GameSettings } from "../../containers/GamePageContainer/GamePageContainer";
import GameForm from "./GameForm";

export default {
  title: "Game Form",
  decorators: [withKnobs],
};

const settings: GameSettings = {
  userName: "",
  fieldSize: 2,
};

export const GameFormExample: React.FC = () => (
  <GameForm initialValues={settings} onSubmit={action("onSubmit")} onReset={action("onReset")} />
);
