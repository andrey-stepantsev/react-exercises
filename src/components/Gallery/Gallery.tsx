import React from "react";
import styled from "@emotion/styled";
import { ImageType } from "@/types/GalleryTypes";

interface GalleryProps {
  header: string;
  images: ImageType[];
}

interface ImageProps {
  src: string;
  isHidden: boolean;
}

const GalleryCentered = styled.div`
  text-align: center;
`;

const ImageStyled = styled.img<ImageProps>`
  height: 200px;
  margin: 1px 3px;
  object-fit: cover;
  opacity: ${({ isHidden }) => (isHidden ? "0" : "1")};
  transition: opacity 500ms ease-in;
  width: 15%;
`;

const Gallery: React.FC<GalleryProps> = ({ header, images }) => (
  <GalleryCentered>
    <h1>{header}</h1>
    {images.map(({ id, ...imageProps }) => (
      <ImageStyled key={id} {...imageProps} />
    ))}
  </GalleryCentered>
);

export default Gallery;
