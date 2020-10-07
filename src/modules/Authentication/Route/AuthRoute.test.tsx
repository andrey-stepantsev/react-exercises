import React from "react";
import { mount } from "enzyme";
import { store } from "@/redux/store";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { actions } from "../slice";
import { AuthRoute } from "./AuthRoute";

const MockComponent: React.FC = () => <h1>Test Compoent</h1>;

const routeProps = {
  path: "/",
  component: MockComponent,
};

const MockBrowserRouter = (
  <BrowserRouter>
    <AuthRoute {...routeProps} />
  </BrowserRouter>
);

describe("AuthRoute", () => {
  it("returns route component when user is authenticated", async () => {
    store.dispatch(actions.login("Test"));
    const wrapper = await mount(MockBrowserRouter);
    const wrapperRoute = wrapper.find(Route);
    expect(wrapperRoute).toHaveLength(1);
    expect(wrapperRoute.props()).toEqual(routeProps);
    store.dispatch(actions.logout());
  });
  it("returns redirect component when user is not authenticated", async () => {
    const wrapper = await mount(MockBrowserRouter);
    const wrapperRedirect = wrapper.find(Redirect);
    expect(wrapperRedirect).toHaveLength(1);
  });
});
