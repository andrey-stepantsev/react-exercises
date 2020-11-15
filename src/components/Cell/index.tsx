import React from "react";
import styled from "@emotion/styled";

interface ICell extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: number;
}

const Button: React.FC<ICell> = ({ value, ...button }) => {
  return <button {...button}>{value}</button>;
};

export const Cell = styled(Button)(
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    minWidth: "85px",
    cursor: "pointer",
    outline: "none",
    ":hover": {
      opacity: "0.8",
    },
    ":before": {
      content: '""',
      display: "inline-block",
      paddingBottom: "100%",
      verticalAlign: "top",
    },
  },
  (props) => ({
    fontSize: props.value ? "1.8rem" : "0px",
    backgroundColor: props.value ? "#00bcd4" : "#e0e0e0",
    pointerEvents: props.value ? "auto" : "none",
  })
);
