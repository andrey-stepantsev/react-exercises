import React from "react";
import { render } from "react-dom";
import GalleryContainer from "./containers/GalleryContainer/GalleryContainer";

render(<GalleryContainer header="Dogs Gallery" interval={2} />, document.getElementById("root"));
