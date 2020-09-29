import React from "react";
import { shallow, mount } from "enzyme";
import GameAreaContainer from "./GameAreaContainer";
import GameArea from "@/components/GameArea";

jest.useFakeTimers("modern");

describe("GameAreaContainer", () => {
  it("generated game area contains the correct set of props", () => {
    const gameArea = shallow(<GameAreaContainer />).find(GameArea);
    expect(gameArea.props()).toEqual({
      field: expect.any(Array),
      timer: expect.any(String),
      stepsCount: 0,
      onClick: expect.any(Function),
    });
  });
  it("clicking on the empty cell doesn't change its position", () => {
    const wrapper = shallow(<GameAreaContainer />);
    wrapper.find(GameArea).props().onClick(1, 1);
    wrapper.update();
    expect(wrapper.find(GameArea).props().field[1][1]).toEqual(0);
  });
  it("clicking on the cell that is not adjacent to the empty cell doesn't change the empty cell position", () => {
    const wrapper = shallow(<GameAreaContainer />);
    wrapper.find(GameArea).props().onClick(0, 0);
    wrapper.update();
    expect(wrapper.find(GameArea).props().field[1][1]).toEqual(0);
  });
  it("clicking on the adjacent cell change the empty cell position", () => {
    const wrapper = shallow(<GameAreaContainer />);
    wrapper.find(GameArea).props().onClick(1, 0);
    wrapper.update();
    expect(wrapper.find(GameArea).props().field[0][1]).toEqual(0);
    wrapper.find(GameArea).props().onClick(0, 0);
    wrapper.update();
    expect(wrapper.find(GameArea).props().field[0][0]).toEqual(0);
    wrapper.find(GameArea).props().onClick(0, 1);
    wrapper.update();
    expect(wrapper.find(GameArea).props().field[1][0]).toEqual(0);
  });
  it("timer is working correctly", async () => {
    const updateTimer = jest.spyOn(GameAreaContainer.prototype, "updateTimer");
    await mount(<GameAreaContainer />);
    expect(updateTimer).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(updateTimer).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000);
    expect(updateTimer).toHaveBeenCalledTimes(2);
  });
});
