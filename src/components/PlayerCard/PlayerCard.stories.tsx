import React from "react";
import { text, withKnobs } from "@storybook/addon-knobs";
import { MemoryRouter, Route } from "react-router-dom";
import PlayerCard from "./PlayerCard";

export default {
  title: "Player Card",
  decorators: [withKnobs],
};

export const PlayerCardExample: React.FC = () => (
  <MemoryRouter>
    <Route path="/">
      <PlayerCard userName={text("userName", "Test")} />
    </Route>
  </MemoryRouter>
);
