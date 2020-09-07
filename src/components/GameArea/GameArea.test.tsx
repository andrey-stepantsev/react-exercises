import React from "react";
import { mount } from "enzyme";
import GameArea from "./GameArea";

const arrFilled: number[][] = [
  [9, 3, 1, 7],
  [11, 10, 14, 12],
  [4, 6, 8, 2],
  [15, 5, 13, 0],
];

const onClick = jest.fn();

describe("GameArea", () => {
  it("rendered game area consists of two parts", () => {
    const wrapper = mount(<GameArea field={arrFilled} timer={"00:00"} stepsCount={0} onClick={onClick} />);
    expect(wrapper.find("div").first().children()).toHaveLength(2);
  });
});
