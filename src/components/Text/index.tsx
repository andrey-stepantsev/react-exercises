import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  margin: 15px 0 35px 0;
`;

const Header = styled.h1`
  color: #00bcd4;
  letter-spacing: 3px;
  margin: 0;
  text-align: center;
  text-transform: uppercase;
`;

const First = styled(Header)`
  font-size: 25px;
  margin-bottom: 10px;
`;

const Second = styled(Header)`
  font-size: 15px;
`;

export const WelcomeText = (): JSX.Element => (
  <Container>
    <First>The House of Logic</First>
    <Second>Raise Your Skills</Second>
  </Container>
);
