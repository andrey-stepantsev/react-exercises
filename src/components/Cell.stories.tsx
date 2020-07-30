import React from "react";
import { withKnobs, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Cell from "./Cell";

export default {
  title: "Cell",
  decorators: [withKnobs],
};

export const cellEmpty: React.FC = () => (
  <Cell
    key="jsx"
    x={number("x", 0)}
    y={number("y", 0)}
    value={number("value", 0)}
    onClick={action("The empty cell was clicked")}
  />
);

export const cellFilled: React.FC = () => (
  <Cell
    key="jsx"
    x={number("x", 0)}
    y={number("y", 0)}
    value={number("value", 1)}
    onClick={action("The filled cell was clicked")}
  />
);
