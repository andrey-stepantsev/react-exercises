import React from "react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import Image from "./Image";

export default {
  title: "Image",
  decorators: [withKnobs],
};

export const ImageExample: React.FC = () => (
  <Image src={text("src", "https://ru.reactjs.org/logo-og.png")} isHidden={boolean("isHidden", false)} />
);
