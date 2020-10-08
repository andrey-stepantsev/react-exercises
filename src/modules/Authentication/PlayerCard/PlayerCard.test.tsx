import React from "react";
import { mount } from "enzyme";
import { PlayerCardComponent } from "./PlayerCard";
import { actions } from "../slice";

describe("PlayerCard", () => {
  it("click on the logout button calls the logout reducer", async () => {
    const logout = jest.spyOn(actions, "logout");
    const wrapper = mount(<PlayerCardComponent userName="Test" logout={actions.logout} />);
    await wrapper.find("button").simulate("click");
    expect(logout).toHaveBeenCalled();
  });
});
