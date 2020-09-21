import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { logIn } from "@/utils/AuthUtils";
import LoginForm from "./LoginForm";

const mockHistory = { push: jest.fn() };

jest.mock("react-router-dom", () => ({
  useHistory: () => mockHistory,
}));

jest.mock("utils/AuthUtils", () => ({
  logIn: jest.fn(),
}));

describe("LoginForm", () => {
  it("navigates to the game page on form submit", async () => {
    const userName = "Test";
    const wrapper = mount(<LoginForm />);

    await act(async () => {
      wrapper.find("input[name='userName']").simulate("change", {
        target: { name: "userName", value: userName },
      });
    });

    await act(async () => {
      wrapper.find("form").simulate("submit", { preventDefault: () => null });
    });

    expect(logIn).toHaveBeenCalledWith(userName);
    expect(mockHistory.push).toHaveBeenCalledWith("/");
  });
});
