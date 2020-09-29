import React from "react";
import { shallow } from "enzyme";
import GameAreaContainer from "@/containers/GameAreaContainer";
import GamePageContainer from "./GamePageContainer";

describe("GamePageContainer", () => {
  it("initialized page contains hidden game area", () => {
    const wrapper = shallow(<GamePageContainer />);
    expect(wrapper.find(GameAreaContainer).length).toBe(0);
  });
});
