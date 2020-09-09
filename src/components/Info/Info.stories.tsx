import React from "react";
import { withKnobs, text, number } from "@storybook/addon-knobs";
import Info from "./Info";

export default {
  title: "Info",
  decorators: [withKnobs],
};

export const InfoExample: React.FC = () => <Info timer={text("timer", "00:00")} stepsCount={number("stepsCount", 0)} />;
