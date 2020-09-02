import React from "react";
import { withKnobs, text, number, object } from "@storybook/addon-knobs";
import { GameSettings } from "types/GameTypes";
import { GameMode } from "enums/GameEnums";
import Info from "./Info";

export default {
  title: "Info",
  decorators: [withKnobs],
};

const settings: GameSettings = {
  gameMode: GameMode.FREE,
  userName: "Test",
  fieldSize: 4,
};

export const InfoExample: React.FC = () => (
  <Info timer={text("timer", "00:00")} stepsCount={number("stepsCount", 0)} settings={object("settings", settings)} />
);
