import React from "react";
import { mount } from "enzyme";
import { logOut } from "@/utils/AuthUtils";
import PlayerCard from "./PlayerCard";

const mockHistory = { push: jest.fn() };

jest.mock("react-router-dom", () => ({
  useHistory: () => mockHistory,
}));

jest.mock("utils/AuthUtils", () => ({
  logOut: jest.fn(),
}));

describe("PlayerCard", () => {
  it("navigates to the login page on logout", async () => {
    const wrapper = mount(<PlayerCard userName="Test" />);
    await wrapper.find("button").simulate("click");
    expect(logOut).toHaveBeenCalled();
    expect(mockHistory.push).toHaveBeenCalledWith("/login");
  });
});
