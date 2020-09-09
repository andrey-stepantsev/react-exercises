import React from "react";
import { mount } from "enzyme";
import { Route, Redirect, BrowserRouter } from "react-router-dom";
import { logIn } from "./AuthUtils";
import PrivateRoute from "./PrivateRoute";

const MockComponent: React.FC = () => <h1>Test Compoent</h1>;

const MockRouteProps = {
  path: "/",
  component: MockComponent,
};

const MockBrowserRouter = (
  <BrowserRouter>
    <PrivateRoute {...MockRouteProps} />
  </BrowserRouter>
);

describe("PrivateRoute", () => {
  afterEach(() => {
    localStorage.clear();
  });
  it("returns route component when user is authorized", async () => {
    await logIn("Test");
    const wrapper = await mount(MockBrowserRouter);
    expect(wrapper.find(Route)).toHaveLength(1);
    expect(wrapper.find(Route).props()).toEqual(MockRouteProps);
  });
  it("returns redirect component when user is not authorized", async () => {
    const wrapper = await mount(MockBrowserRouter);
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });
});
