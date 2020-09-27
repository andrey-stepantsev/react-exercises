import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { LoginFormComponent } from "./LoginForm";
import { actions } from "../slice";

describe("LoginForm", () => {
  it("submit calls the login reducer with correct payload", async () => {
    const login = jest.spyOn(actions, "login");

    const userName = "Test";
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
