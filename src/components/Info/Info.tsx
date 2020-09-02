import React from "react";
import styled from "@emotion/styled";
import { GameSettings } from "types/GameTypes";
import { GameMode } from "enums/GameEnums";

interface InfoProps {
  timer: string;
  stepsCount: number;
  settings: GameSettings;
}

const InfoBlock = styled.div`
  border: 2px solid #b4a89c;
  border-radius: 5px;
  padding: 10px;
`;

const InfoText = styled.p`
  color: #776e65;
  font-weight: bold;
  margin: 0;
  margin-bottom: 0.5rem;
  text-decoration: underline;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Info: React.FC<InfoProps> = ({ timer, stepsCount, settings }) => (
  <InfoBlock>
    {settings.gameMode === GameMode.RATING && <InfoText>Name: {settings.userName}</InfoText>}
    <InfoText>Time: {timer}</InfoText>
    <InfoText>Steps: {stepsCount}</InfoText>
  </InfoBlock>
);

export default Info;
