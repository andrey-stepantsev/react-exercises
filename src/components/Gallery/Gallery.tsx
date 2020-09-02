import React from "react";
import styled from "@emotion/styled";
import { ImageType } from "types/GalleryTypes";
import Image from "components/Image";

interface GalleryProps {
  header: string;
  images: ImageType[];
}

const GalleryCentered = styled.div`
  text-align: center;
`;

const Gallery: React.FC<GalleryProps> = ({ header, images }) => (
  <GalleryCentered>
    <h1>{header}</h1>
    {images.map(({ id, ...imageProps }) => (
      <Image key={id} {...imageProps} />
    ))}
  </GalleryCentered>
);

export default Gallery;
