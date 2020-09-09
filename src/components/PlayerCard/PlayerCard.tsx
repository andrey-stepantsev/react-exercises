import React from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import { logOut } from "utils/AuthUtils";

interface PlayerCardProps {
  userName: string;
}

const CardBlock = styled.div`
  border: 2px solid #b4a89c;
  border-radius: 5px;
  margin: 25px 15px;
  padding: 15px;
  position: relative;
  width: 305px;
`;

const CardHeader = styled.h3`
  color: #776e65;
  font-weight: bold;
  margin: 0;
  margin-bottom: 10px;
`;

const CardText = styled.p`
  color: #776e65;
  font-weight: bold;
  margin: 0;
  margin-bottom: 5px;
  text-decoration: underline;
  &:last-child {
    margin-bottom: 0;
  }
`;

const LogoutButton = styled.button`
  background-color: #eee4da;
  border: 1px solid #b4a89c;
  border-radius: 5px;
  color: #776e65;
  cursor: pointer;
  font-weight: bold;
  margin: 10px;
  padding: 8px 10px;
  position: absolute;
  top: 0;
  right: 0;
  &:hover {
    background-color: #f8efe6;
  }
`;

const PlayerCard: React.FC<PlayerCardProps> = ({ userName }) => {
  const history = useHistory();

  const handleLogout = async (): Promise<void> => {
    await logOut();
    history.push("/login");
  };

  return (
    <CardBlock>
      <CardHeader>Player&apos;s Card</CardHeader>
      <CardText>Name: {userName}</CardText>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </CardBlock>
  );
};

export default React.memo(PlayerCard);
