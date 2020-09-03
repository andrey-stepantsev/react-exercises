import React from "react";
import { withKnobs, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Field from "./Field";

export default {
  title: "Field",
  decorators: [withKnobs],
};

const arrEmpty: number[][] = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const arrFilled: number[][] = [
  [9, 3, 1, 7],
  [11, 10, 14, 12],
  [4, 6, 8, 2],
  [15, 5, 13, 0],
];

export const Empty: React.FC = () => (
  <Field field={object("Field", arrEmpty)} onClick={action("onClick - Empty Field")} />
);

export const Filled: React.FC = () => (
  <Field field={object("Field", arrFilled)} onClick={action("onClick - Filled Field")} />
);
