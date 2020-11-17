import React from "react";
import { useRouter } from "next/router";
import { isLoggedIn, LoginForm } from "@/modules/Authentication";
import { Flex } from "@/components/Container";

const LoginScreen: React.FC = () => {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = React.useState(true);

  const isUserLogged = async () => {
    const isLogged = await isLoggedIn();
    isLogged ? router.replace("/game") : setIsAuthenticated(false);
  };

  React.useEffect(() => {
    isUserLogged();
  });

  return (
    <>
      {!isAuthenticated && (
        <Flex margin="auto">
          <LoginForm />
        </Flex>
      )}
    </>
  );
};

export default LoginScreen;
