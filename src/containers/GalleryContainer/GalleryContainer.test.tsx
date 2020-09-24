import React from "react";
import { mount } from "enzyme";
import * as FetcherModule from "@/utils/Fetcher";
import GalleryContainer from "./GalleryContainer";

const HeaderMock = "Test Header";

const StateMock = {
  images: [
    { id: 1, src: "1", isHidden: false },
    { id: 2, src: "2", isHidden: false },
  ],
};

jest.useFakeTimers("modern");

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
  test("rendered component contains correct state after componentDidMount", async () => {
    const FetcherMock = jest.spyOn(FetcherModule, "fetchDogs");
    FetcherMock.mockResolvedValue(["1", "2"]);
    const wrapper = await mount(<GalleryContainer header={HeaderMock} interval={2} />);
    expect(wrapper.instance().state).toEqual(StateMock);
  });
  it("animation is working correctly after changing intervals", async () => {
    const animateImages = jest.spyOn(GalleryContainer.prototype, "animateImages");
    await mount(<GalleryContainer header={HeaderMock} interval={2} />);
    expect(animateImages).not.toHaveBeenCalled();
    jest.advanceTimersByTime(2000);
    expect(animateImages).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(2000);
    expect(animateImages).toHaveBeenCalledTimes(2);
  });
});
