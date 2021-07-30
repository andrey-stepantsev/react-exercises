import React from "react";
import styled from "@emotion/styled";
import { Icon } from "@/components/Text";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: string;
  fluid?: boolean;
}

const Button: React.FC<IButton> = ({ text, icon, fluid, ...button }) => (
  <button {...button}>
    {icon && <Icon className="material-icons">{icon}</Icon>}
    <span>{text}</span>
  </button>
);

export const PrimaryButton = styled(Button)(
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.1rem",
    color: "#fff",
    backgroundColor: "#00bcd4",
    border: "none",
    borderRadius: "5px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
    padding: "12px 30px",
    outline: "none",
    cursor: "pointer",
    ":hover": {
      opacity: "0.8",
    },
  },
  ({ fluid }) => ({
    width: fluid ? "100%" : "",
  })
);
