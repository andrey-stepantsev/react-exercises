import React from "react";
import styled from "@emotion/styled";
import { RootState } from "@/redux/store";
import { actions } from "../slice";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { CardBlock, CardHeader, CardText } from "@/components/Card";

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

const mapStateToProps = (state: RootState) => ({
  ...state.authentication,
});

const mapDispatchToProps = {
  logout: actions.logout,
};

export type PlayerCardProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export const PlayerCardComponent: React.FC<PlayerCardProps> = ({ userName, logout }) => {
  const handleLogout = async (): Promise<void> => {
    logout();
  };

  const CardFragment = (
    <CardBlock>
      <CardHeader>Player&apos;s Card</CardHeader>
      <CardText>Name: {userName}</CardText>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </CardBlock>
  );

  return userName.trim().length > 0 ? CardFragment : <Redirect to="/login" />;
};

export const PlayerCard = connect(mapStateToProps, mapDispatchToProps)(PlayerCardComponent);
