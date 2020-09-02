import React from "react";
import { mount } from "enzyme";
import Image from "./Image";

const LinkMock = "https:/images/image.png";

describe("Image", () => {
  it("rendering with the passed src", () => {
    const wrapper = mount(<Image src={LinkMock} isHidden={false} />);
    expect(wrapper.find("img").prop("src")).toBe(LinkMock);
  });
  it("rendering with class hidden", () => {
    const wrapper = mount(<Image src={LinkMock} isHidden={true} />);
    const style = window.getComputedStyle(wrapper.find("img").getDOMNode());
    expect(style.opacity).toBe("0");
  });
  it("rendering with class showed", () => {
    const wrapper = mount(<Image src={LinkMock} isHidden={false} />);
    const style = window.getComputedStyle(wrapper.find("img").getDOMNode());
    expect(style.opacity).toBe("1");
  });
});
