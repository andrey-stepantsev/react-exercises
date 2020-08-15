import React from "react";
import { withKnobs, text, object } from "@storybook/addon-knobs";
import Gallery from "./Gallery";

export default {
  title: "Gallery",
  decorators: [withKnobs],
};

const images = [
  { id: 1, src: "https://ru.reactjs.org/logo-og.png", isHidden: false },
  { id: 2, src: "http://w3.org.ua/wp-content/uploads/2017/01/HTML5.jpg", isHidden: false },
  { id: 3, src: "https://miro.medium.com/max/816/1*mn6bOs7s6Qbao15PMNRyOA.png", isHidden: false },
];

export const GalleryExample: React.FC = () => (
  <Gallery images={object("images", images)} header={text("header", "Gallery Header")} />
);
