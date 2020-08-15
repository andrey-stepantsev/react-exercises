import React from "react";
import { shallow } from "enzyme";
import ImageContainer from "./ImageContainer";
import Image from "../../components/Image/Image";

const LinkMock = "https:/images/image.png";

describe("ImageContainer", () => {
  it("child component has the correct set of props", () => {
    const image = shallow(<ImageContainer src={LinkMock} isHidden={false} />).find(Image);
    expect(image.props()).toEqual({ src: LinkMock, isHidden: false });
  });
  it("shouldComponentUpdate returns true", () => {
    const wrapper = shallow(<ImageContainer src={LinkMock} isHidden={false} />);
    const instance = wrapper.instance();
    const nextProps = { src: LinkMock, isHidden: true };
    const isUpdated = instance.shouldComponentUpdate ? instance.shouldComponentUpdate(nextProps, {}, {}) : undefined;
    expect(isUpdated).toBe(true);
  });
  it("shouldComponentUpdate returns false", () => {
    const wrapper = shallow(<ImageContainer src={LinkMock} isHidden={false} />);
    const instance = wrapper.instance();
    const nextProps = { src: LinkMock, isHidden: false };
    const isUpdated = instance.shouldComponentUpdate ? instance.shouldComponentUpdate(nextProps, {}, {}) : undefined;
    expect(isUpdated).toBe(false);
  });
});
