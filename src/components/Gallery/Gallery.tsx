import React from "react";
import { ImageType } from "../../containers/GalleryContainer/GalleryContainer";
import ImageContainer from "../../containers/ImageContainer/ImageContainer";
import "./Gallery.css";

interface GalleryProps {
  header: string;
  images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ header, images }) => (
  <div className="gallery">
    <h1>{header}</h1>
    {images.map(({ id, ...imageProps }) => (
      <ImageContainer key={id} {...imageProps} />
    ))}
  </div>
);

export default Gallery;
