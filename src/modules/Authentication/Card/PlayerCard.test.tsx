import React from "react";
import faker from "faker";
import { mount } from "enzyme";
import { RootState } from "@/redux/store";
import { actions } from "../slice";
import { PlayerCardComponent, mapStateToProps } from "./PlayerCard";

jest.mock("next/router", () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

const userName = faker.internet.userName();

const getState = () => ({
  authentication: {
    userName,
  },
});

describe("mapStateToProps", () => {
  it("contains correctly mapped state", () => {
    const state = getState();
    const propsExpected = { ...state.authentication };
    const propsActual = mapStateToProps(state as RootState);
    expect(propsActual).toEqual(propsExpected);
  });
});

describe("PlayerCard", () => {
  it("click on the logout button dispatches the logout action", async () => {
    const logout = jest.spyOn(actions, "logout");
    const wrapper = mount(<PlayerCardComponent userName={userName} logout={actions.logout} />);
    await wrapper.find("button").simulate("click");
    expect(logout).toHaveBeenCalled();
  });
});
