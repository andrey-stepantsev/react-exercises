import React from "react";
import styled from "@emotion/styled";
import Cell from "@/components/Cell";

interface FieldProps {
  field: number[][];
  onClick(x: number, y: number): void;
}

const TableField = styled.div`
  background-color: #b4a89c;
  border-radius: 5px;
  display: table;
  margin: 25px;
  padding: 4px;
`;

const Field: React.FC<FieldProps> = ({ field, onClick }) => (
  <TableField>
    {field.map((row, y) => [
      ...row.map((value, x) => <Cell key={`${x}_${y}`} x={x} y={y} value={value} onClick={onClick} />),
      <br key={y} />,
    ])}
  </TableField>
);

export default React.memo(Field);
