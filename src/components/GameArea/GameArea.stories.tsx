import React from "react";
import { withKnobs, object, text, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import GameArea from "./GameArea";

export default {
  title: "Game Area",
  decorators: [withKnobs],
};

const arrFilled: number[][] = [
  [9, 3, 1, 7],
  [11, 10, 14, 12],
  [4, 6, 8, 2],
  [15, 5, 13, 0],
];

export const GameAreaExample: React.FC = () => (
  <GameArea
    field={object("field", arrFilled)}
    timer={text("timer", "00:00")}
    stepsCount={number("stepsCount", 0)}
    onClick={action("onClick")}
  />
);