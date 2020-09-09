import React from "react";
import { mount } from "enzyme";
import Info from "./Info";

describe("Info", () => {
  it("rendered info contains the correct set of props", () => {
    const expectedProps = { timer: "00:00", stepsCount: 0 };
    const wrapper = mount(<Info {...expectedProps} />);
    expect(wrapper.props()).toEqual(expectedProps);
  });
  it("rendered info contains two rows", () => {
    const wrapper = mount(<Info timer="00:00" stepsCount={0} />);
    expect(wrapper.find("p")).toHaveLength(2);
  });
});
