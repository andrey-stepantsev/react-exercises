import React from "react";
import styled from "@emotion/styled";

type CellProps = {
  x: number;
  y: number;
  value: number;
  onClick(x: number, y: number): void;
};

const Filled = styled.button`
  background-color: #eee4da;
  border: none;
  border-radius: 5px;
  color: #776e65;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  height: 50px;
  margin: 4px;
  outline: none;
  vertical-align: top;
  width: 50px;
  &:hover {
    background-color: #f8efe6;
  }
`;

const Empty = styled(Filled)`
  background-color: #ccc0b4;
  cursor: default;
  &:hover {
    background-color: #ccc0b4;
  }
`;

const Cell: React.FC<CellProps> = ({ x, y, value, onClick }) => {
  return value ? <Filled onClick={() => onClick(x, y)}>{value}</Filled> : <Empty onClick={() => null}></Empty>;
};

export default Cell;
