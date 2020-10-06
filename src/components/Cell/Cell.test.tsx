import React from "react";
import { mount } from "enzyme";
import Cell from "./Cell";

const onClick = jest.fn();

describe("Cell", () => {
  it("empty cell doesn't contain value", () => {
    const wrapper = mount(<Cell x={3} y={3} value={0} onClick={onClick} />);
    expect(wrapper.find("button").text()).toBe("");
  });
  it("filled cell contains correct value", () => {
    const wrapper = mount(<Cell x={0} y={0} value={1} onClick={onClick} />);
    expect(wrapper.find("button").text()).toBe("1");
  });
  it("clicking on the empty cell doesn't call the handler", () => {
    const wrapper = mount(<Cell x={3} y={3} value={0} onClick={onClick} />);
    wrapper.simulate("click");
    expect(onClick).not.toHaveBeenCalled();
  });
  it("clicking on the filled cell calls the handler", () => {
    const wrapper = mount(<Cell x={0} y={0} value={1} onClick={onClick} />);
    wrapper.simulate("click");
    expect(onClick).toHaveBeenCalled();
  });
  it("clicking on the filled cell calls the handler with correct parameters", () => {
    const [x, y] = [0, 0];
    const wrapper = mount(<Cell x={x} y={y} value={1} onClick={onClick} />);
    wrapper.simulate("click");
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith({ x, y });
  });
});
