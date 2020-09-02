import React from "react";
import styled from "@emotion/styled";
import { GameSettings } from "types/GameTypes";
import Field from "components/Field";
import Info from "components/Info";

interface GameAreaProps {
  field: number[][];
  timer: string;
  stepsCount: number;
  settings: GameSettings;
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
