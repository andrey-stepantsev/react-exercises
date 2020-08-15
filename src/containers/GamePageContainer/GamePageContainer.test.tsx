import React from "react";
import { shallow } from "enzyme";
import GameForm from "../../components/GameForm/GameForm";
import FieldContainer from "../FieldContainer/FieldContainer";
import GamePageContainer, { GameSettings } from "./GamePageContainer";

describe("GamePageContainer", () => {
  it("initialized page contains form and hidden field", () => {
    const wrapper = shallow(<GamePageContainer />);
    expect(wrapper.find(GameForm).length).toBe(1);
    expect(wrapper.find(FieldContainer).length).toBe(0);
  });
  it("update settings after submit form", () => {
    const settings: GameSettings = { userName: "Andrey", fieldSize: 4 };
    const wrapper = shallow(<GamePageContainer />);
    const instance = wrapper.instance() as GamePageContainer;
    expect(wrapper.find(FieldContainer).length).toBe(0);
    instance.handleSubmit(settings);
    wrapper.update();
    expect(wrapper.state("settings")).toBe(settings);
  });
  it("change field visible after submit form", () => {
    const settings: GameSettings = { userName: "Andrey", fieldSize: 4 };
    const wrapper = shallow(<GamePageContainer />);
    const instance = wrapper.instance() as GamePageContainer;
    expect(wrapper.find(FieldContainer).length).toBe(0);
    instance.handleSubmit(settings);
    wrapper.update();
    expect(wrapper.find(FieldContainer).length).toBe(1);
  });
  it("hide field after reset form", () => {
    const settings: GameSettings = { userName: "Andrey", fieldSize: 4 };
    const wrapper = shallow(<GamePageContainer />);
    const instance = wrapper.instance() as GamePageContainer;
    expect(wrapper.find(FieldContainer).length).toBe(0);
    instance.handleSubmit(settings);
    wrapper.update();
    expect(wrapper.find(FieldContainer).length).toBe(1);
    instance.resetHandler();
    wrapper.update();
    expect(wrapper.find(FieldContainer).length).toBe(0);
  });
});
