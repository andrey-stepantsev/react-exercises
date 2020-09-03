import React from "react";
import { withKnobs, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Cell from "./Cell";

export default {
  title: "Cell",
  decorators: [withKnobs],
};

export const Empty: React.FC = () => (
  <Cell x={number("x", 0)} y={number("y", 0)} value={number("value", 0)} onClick={action("onClick - Empty Cell")} />
);

export const Filled: React.FC = () => (
  <Cell x={number("x", 0)} y={number("y", 0)} value={number("value", 1)} onClick={action("onClick - Filled Cell")} />
);
