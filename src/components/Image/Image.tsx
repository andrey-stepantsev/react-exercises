import React from "react";
import styled from "@emotion/styled";

interface ImageProps {
  src: string;
  isHidden: boolean;
}

const ImageStyled = styled.img<ImageProps>`
  height: 200px;
  margin: 1px 3px;
  object-fit: cover;
  opacity: ${({ isHidden }) => (isHidden ? "0" : "1")};
  transition: opacity 500ms ease-in;
  width: 15%;
`;

const Image: React.FC<ImageProps> = (props) => <ImageStyled {...props} />;

export default React.memo(Image);
