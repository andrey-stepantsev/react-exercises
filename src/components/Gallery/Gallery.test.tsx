import React from "react";
import { mount } from "enzyme";
import Gallery from "./Gallery";

const ImagesMock = [
  { id: 1, src: "https://ru.reactjs.org/logo-og.png", isHidden: false },
  { id: 2, src: "http://w3.org.ua/wp-content/uploads/2017/01/HTML5.jpg", isHidden: false },
  { id: 3, src: "https://miro.medium.com/max/816/1*mn6bOs7s6Qbao15PMNRyOA.png", isHidden: false },
];

const HeaderMock = "Test Header";

describe("Gallery", () => {
  it("rendered gallery has the correct header", () => {
    const wrapper = mount(<Gallery images={ImagesMock} header={HeaderMock} />);
    expect(wrapper.find("h1").text()).toBe(HeaderMock);
  });
  it("rendered gallery has the correct images count", () => {
    const wrapper = mount(<Gallery images={ImagesMock} header={HeaderMock} />);
    expect(wrapper.find("img").length).toBe(ImagesMock.length);
  });
});
