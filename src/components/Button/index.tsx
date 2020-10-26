import React from "react";
import styled from "@emotion/styled";

const SimpleButton = styled.button`
  align-items: center;
  background-color: #00bcd4;
  border: none;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  color: #fff;
  cursor: pointer;
  display: flex;
  font-size: 18px;
  justify-content: center;
  outline: none;
  padding: 14px 14px 13px;
  width: 100%;
  &:hover {
    background-color: #00bcd4c7;
  }
`;

interface IButton {
  type: "button" | "submit";
  icon?: string;
  text: string;
}

export const Button: React.FC<IButton> = ({ type, icon, text }) => (
  <SimpleButton type={type}>
    {icon && <span className="material-icons">{icon}</span>}
    <span>{text}</span>
  </SimpleButton>
);
