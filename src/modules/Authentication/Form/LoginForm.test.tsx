import React from "react";
import faker from "faker";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { RootState } from "@/redux/store";
import { actions } from "../slice";
import { LoginFormComponent, mapStateToProps } from "./LoginForm";

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

describe("LoginForm", () => {
  it("submit dispatches the login action", async () => {
    const login = jest.spyOn(actions, "login");
    const wrapper = mount(<LoginFormComponent userName="" login={actions.login} />);

    await act(async () => {
      wrapper.find("input[name='userName']").simulate("change", {
        target: { name: "userName", value: userName },
      });
    });

    await act(async () => {
      wrapper.find("form").simulate("submit", { preventDefault: () => null });
    });

    expect(login).toHaveBeenCalledWith(userName);
  });
});
