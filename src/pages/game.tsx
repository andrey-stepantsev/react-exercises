import React from "react";
import { useRouter } from "next/router";
import { isLoggedIn, PlayerCard } from "@/modules/Authentication";
import { GameTemplate } from "@/modules/Game";
import { Flex } from "@/components/Container";
import { Paper } from "@/components/Paper";

const GameScreen: React.FC = () => {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const isUserLogged = async () => {
    const isLogged = await isLoggedIn();
    isLogged ? setIsAuthenticated(true) : router.replace("/");
  };

  React.useEffect(() => {
    isUserLogged();
  });

  return (
    <>
      {isAuthenticated && (
        <Flex alignItems="stretch" margin="auto">
          <Flex flexDirection="column" alignItems="stretch">
            <PlayerCard />
            <Paper height="100%" margin="15px 15px 0" />
          </Flex>
          <Flex flexDirection="column">
            <GameTemplate />
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default GameScreen;
