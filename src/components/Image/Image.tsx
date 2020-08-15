import React from "react";
import "./Image.css";

interface ImageProps {
  src: string;
  isHidden: boolean;
}

const Image: React.FC<ImageProps> = ({ src, isHidden }) => (
  <img src={src} className={`image ${isHidden ? "hidden" : "showed"}`} />
);

export default Image;
