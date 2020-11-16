import React from "react";
import faker from "faker";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { RootState } from "@/redux/store";
import { actions } from "@/modules/Authentication/slice";
import { LoginFormComponent, mapStateToProps } from "./LoginForm";

jest.mock("next/router", () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

const getState = (userName: string) => ({
  authentication: {
    userName,
  },
});

describe("mapStateToProps", () => {
  it("return expected props", () => {
    const userName = faker.internet.userName();
    const state = getState(userName);
    const propsExpected = { ...state.authentication };
    const propsActual = mapStateToProps(state as RootState);
    expect(propsActual).toEqual(propsExpected);
  });
});

describe("LoginForm", () => {
  it("dispatch login action on submit", async () => {
    const userName = faker.internet.userName();

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
