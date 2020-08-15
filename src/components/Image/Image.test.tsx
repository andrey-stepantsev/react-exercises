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
    expect(wrapper.find("img").prop("className")).toBe("image hidden");
  });
  it("rendering with class showed", () => {
    const wrapper = mount(<Image src={LinkMock} isHidden={false} />);
    expect(wrapper.find("img").prop("className")).toBe("image showed");
  });
});
