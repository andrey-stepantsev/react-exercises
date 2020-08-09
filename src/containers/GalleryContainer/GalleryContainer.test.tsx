import React from "react";
import { mount } from "enzyme";
import * as FetcherModule from "../../utils/Fetcher";
import GalleryContainer from "./GalleryContainer";

const HeaderMock = "Test Header";

const FetcherMock = jest.spyOn(FetcherModule, "fetchImages");
FetcherMock.mockResolvedValue({ message: ["1", "2"], status: "success" });

const StateMock = {
  images: [
    { id: 1, src: "1", isHidden: false },
    { id: 2, src: "2", isHidden: false },
  ],
};

jest.useFakeTimers();

describe("GalleryContainer", () => {
  it("rendered component has the correct set of props", () => {
    const wrapper = mount(<GalleryContainer header={HeaderMock} interval={2} />);
    expect(wrapper.props()).toEqual({ header: HeaderMock, interval: 2 });
  });
  it("componentDidMount was called", () => {
    const componentDidMount = jest.spyOn(GalleryContainer.prototype, "componentDidMount");
    mount(<GalleryContainer header={HeaderMock} interval={2} />);
    expect(componentDidMount).toHaveBeenCalledTimes(1);
  });
  it("rendered component contains correct state after componentDidMount", async () => {
    const wrapper = await mount(<GalleryContainer header={HeaderMock} interval={2} />);
    expect(wrapper.state()).toEqual(StateMock);
  });
  it("animation is working correctly after intervals", async () => {
    const animateImages = jest.spyOn(GalleryContainer.prototype, "animateImages");
    await mount(<GalleryContainer header={HeaderMock} interval={2} />);
    expect(animateImages).not.toHaveBeenCalled();
    jest.advanceTimersByTime(2000);
    expect(animateImages).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(2000);
    expect(animateImages).toHaveBeenCalledTimes(2);
  });
});
