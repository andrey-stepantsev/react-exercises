import React from "react";
import { mount, CommonWrapper, HTMLAttributes } from "enzyme";
import Field from "./Field";

const arrFilled: number[][] = [
  [9, 3, 1, 7],
  [11, 10, 14, 12],
  [4, 6, 8, 2],
  [15, 5, 13, 0],
];

const onClick = jest.fn();

const isEmpty = (button: CommonWrapper<HTMLAttributes>) => button.text() === "";

describe("Field", () => {
  it("correct rendering of the field", () => {
    const wrapper = mount(<Field field={arrFilled} onClick={onClick} />);
    expect(wrapper.find("button")).toHaveLength(16);
    expect(wrapper.find("button").filterWhere(isEmpty)).toHaveLength(1);
    expect(wrapper.find("br")).toHaveLength(4);
  });
  it("clicking on filled cells calls the handler with correct parameters", () => {
    const wrapper = mount(<Field field={arrFilled} onClick={onClick} />);
    wrapper.find("button").at(14).simulate("click");
    expect(onClick).toHaveBeenLastCalledWith({ x: 2, y: 3 });
    wrapper.find("button").at(10).simulate("click");
    expect(onClick).toHaveBeenLastCalledWith({ x: 2, y: 2 });
  });
  it("clicking on the empty cell doesn't call the handler", () => {
    const wrapper = mount(<Field field={arrFilled} onClick={onClick} />);
    wrapper.find("button").filterWhere(isEmpty).simulate("click");
    expect(onClick).not.toHaveBeenCalled();
  });
});
