import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import GamePageContainer from "./GamePageContainer";

export default {
  title: "Game Page",
};

export const GamePage: React.FC = () => (
  <MemoryRouter>
    <Route path="/">
      <GamePageContainer />
    </Route>
  </MemoryRouter>
);
