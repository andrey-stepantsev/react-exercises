import React from "react";
import { mount } from "enzyme";
import Field from "./Field";

const arrFilled: number[][] = [
  [9, 3, 1, 7],
  [11, 10, 14, 12],
  [4, 6, 8, 2],
  [15, 5, 13, 0],
];

describe("Field", () => {
  it("correct rendering of the field", () => {
    const onClick = jest.fn();
    const wrapper = mount(<Field field={arrFilled} onClick={onClick} />);
    expect(wrapper.find(".cell").length).toBe(16);
    expect(wrapper.find(".cell--empty").length).toBe(1);
    expect(wrapper.find("br").length).toBe(4);
  });
  it("clicking on filled cells calls the handler with correct parameters", () => {
    const onClick = jest.fn();
    const wrapper = mount(<Field field={arrFilled} onClick={onClick} />);
    wrapper.find(".cell").at(14).simulate("click");
    expect(onClick).toHaveBeenLastCalledWith(2, 3);
    wrapper.find(".cell").at(10).simulate("click");
    expect(onClick).toHaveBeenLastCalledWith(2, 2);
  });
  it("clicking on the empty cell doesn't call the handler", () => {
    const onClick = jest.fn();
    const wrapper = mount(<Field field={arrFilled} onClick={onClick} />);
    wrapper.find(".cell--empty").simulate("click");
    expect(onClick).not.toHaveBeenCalled();
  });
});
