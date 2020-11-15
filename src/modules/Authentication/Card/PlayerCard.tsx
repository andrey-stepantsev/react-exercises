import React from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "@/redux/store";
import { Flex } from "@/components/Container";
import { Paper } from "@/components/Paper";
import { Paragraph, Small, IconBig } from "@/components/Text";
import { PrimaryButton } from "@/components/Button";
import { actions, AuthenticationState } from "../slice";

export const mapStateToProps = (state: RootState): AuthenticationState => ({
  ...state.authentication,
});

const mapDispatchToProps = {
  logout: actions.logout,
};

export type PlayerCardProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export const PlayerCardComponent: React.FC<PlayerCardProps> = ({ userName, logout }) => {
  const router = useRouter();

  const onLogout = async (): Promise<void> => {
    logout();
    router.replace("/");
  };

  return (
    <Paper margin="0 15px" padding="25px">
      <Flex justify="flex-start" margin="0 0 25px">
        <IconBig className="material-icons">account_circle</IconBig>
        <Flex direction="column" align="flex-start">
          <Paragraph margin="0 0 8px">{userName}</Paragraph>
          <Small>Current Player</Small>
        </Flex>
      </Flex>
      <PrimaryButton type="button" text="Logout" icon="exit_to_app" onClick={onLogout} fluid />
    </Paper>
  );
};

export const PlayerCard = connect(mapStateToProps, mapDispatchToProps)(PlayerCardComponent);
