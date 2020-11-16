import React from "react";
import { action } from "@storybook/addon-actions";
import { PrimaryButton } from "./Button";

export default {
  title: "Button",
};

const buttonProps = {
  text: "New Button",
  onClick: action("onClick"),
};

export const Text: React.FC = () => {
  return <PrimaryButton {...buttonProps} />;
};

export const Icon: React.FC = () => {
  return <PrimaryButton {...buttonProps} icon="person_add" />;
};

export const Fluid: React.FC = () => {
  return <PrimaryButton {...buttonProps} fluid />;
};
