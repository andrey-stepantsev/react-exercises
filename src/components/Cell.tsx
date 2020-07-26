import React, { FC } from "react";
import "./Cell.css";

interface CellProps {
  x: number;
  y: number;
  value: number;
  onClick(x: number, y: number): void;
}

const Cell: FC<CellProps> = ({ x, y, value, onClick }) => {
  return (
    <button className={value ? "cell" : "cell cell--empty"} onClick={() => (value ? onClick(x, y) : null)}>
      {value || ""}
    </button>
  );
};

export default Cell;
