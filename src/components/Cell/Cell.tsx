import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

interface ICell extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: number;
  background?: string;
}

const Button: React.FC<ICell> = ({ value, background, ...button }) => {
  return <button {...button}>{value}</button>;
};

const Base = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  min-width: 85px;
  cursor: pointer;
  outline: none;
  &:hover {
    opacity: 0.8;
  }
  &:before {
    content: "";
    display: inline-block;
    padding-bottom: 100%;
  }
`;

const Filled = (props: ICell) => css`
  font-size: 1.8rem;
  background-color: ${props.background || "#00bcd4"};
`;

const Empty = css`
  font-size: 0px;
  background-color: #e0e0e0;
  pointer-events: none;
`;

export const Cell = styled(Button)`
  ${Base}
  ${({ value }) => (value ? Filled : Empty)}
`;
