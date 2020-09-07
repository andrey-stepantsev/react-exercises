import React from "react";
import styled from "@emotion/styled";
import Field from "components/Field";
import Info from "components/Info";

interface GameAreaProps {
  field: number[][];
  timer: string;
  stepsCount: number;
  onClick(x: number, y: number): void;
}

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const GameArea: React.FC<GameAreaProps> = ({ field, onClick, ...infoProps }) => (
  <FlexContainer>
    <Field field={field} onClick={onClick} />
    <Info {...infoProps} />
  </FlexContainer>
);

export default GameArea;
