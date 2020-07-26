import React, { FC } from "react";
import Cell from "./Cell";
import "./Field.css";

interface FieldProps {
  field: number[][];
  onClick(x: number, y: number): void;
}

const Field: FC<FieldProps> = ({ field, onClick }) => (
  <div className="field">
    {field.map((row, y) => [
      ...row.map((value, x) => <Cell key={`${x}_${y}`} x={x} y={y} value={value} onClick={onClick} />),
      <br key={y} />,
    ])}
  </div>
);

export default Field;
