import React from "react";
import { shallow } from "enzyme";
import { GameSettings } from "@/types/GameTypes";
import { GameMode } from "@/enums/GameEnums";
import GameForm from "@/components/GameForm";
import GameAreaContainer from "@/containers/GameAreaContainer";
import GamePageContainer from "./GamePageContainer";

const settings: GameSettings = {
  gameMode: GameMode.FREE,
  fieldSize: 2,
};

describe("GamePageContainer", () => {
  it("initialized page contains the form and the hidden game area", () => {
    const wrapper = shallow(<GamePageContainer />);
    expect(wrapper.find(GameForm).length).toBe(1);
    expect(wrapper.find(GameAreaContainer).length).toBe(0);
  });
  it("update settings after submit form", () => {
    const wrapper = shallow(<GamePageContainer />);
    const instance = wrapper.instance() as GamePageContainer;
    expect(wrapper.find(GameAreaContainer).length).toBe(0);
    instance.handleSubmit(settings);
    wrapper.update();
    expect(wrapper.state("settings")).toBe(settings);
  });
  it("change field visible after submit form", () => {
    const wrapper = shallow(<GamePageContainer />);
    const instance = wrapper.instance() as GamePageContainer;
    expect(wrapper.find(GameAreaContainer).length).toBe(0);
    instance.handleSubmit(settings);
    wrapper.update();
    expect(wrapper.find(GameAreaContainer).length).toBe(1);
  });
  it("hide field after reset form", () => {
    const wrapper = shallow(<GamePageContainer />);
    const instance = wrapper.instance() as GamePageContainer;
    expect(wrapper.find(GameAreaContainer).length).toBe(0);
    instance.handleSubmit(settings);
    wrapper.update();
    expect(wrapper.find(GameAreaContainer).length).toBe(1);
    instance.handleReset();
    wrapper.update();
    expect(wrapper.find(GameAreaContainer).length).toBe(0);
  });
});
