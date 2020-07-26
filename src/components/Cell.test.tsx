import React from "react";
import { mount } from "enzyme";
import Cell from "./Cell";

describe("Cell", () => {
  it("correct rendering for the empty cell", () => {
    const onClick = jest.fn();
    const wrapper = mount(<Cell x={3} y={3} value={0} onClick={onClick} />);
    expect(wrapper.html()).toBe('<button class="cell cell--empty"></button>');
  });
  it("correct rendering for the filled cell", () => {
    const onClick = jest.fn();
    const wrapper = mount(<Cell x={0} y={0} value={1} onClick={onClick} />);
    expect(wrapper.html()).toBe('<button class="cell">1</button>');
  });
  it("clicking on the empty cell doesn't call the handler", () => {
    const onClick = jest.fn();
    const wrapper = mount(<Cell x={3} y={3} value={0} onClick={onClick} />);
    wrapper.simulate("click");
    expect(onClick).not.toHaveBeenCalled();
  });
  it("clicking on the filled cell calls the handler", () => {
    const onClick = jest.fn();
    const wrapper = mount(<Cell x={0} y={0} value={1} onClick={onClick} />);
    wrapper.simulate("click");
    expect(onClick).toHaveBeenCalled();
  });
  it("clicking on the filled cell calls the handler with correct parameters", () => {
    const x = 0;
    const y = 0;
    const onClick = jest.fn();
    const wrapper = mount(<Cell x={x} y={y} value={1} onClick={onClick} />);
    wrapper.simulate("click");
    expect(onClick).toHaveBeenCalledWith(x, y);
  });
});
