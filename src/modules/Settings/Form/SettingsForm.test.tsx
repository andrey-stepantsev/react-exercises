import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { SettingsFormComponent } from "./SettingsForm";
import { actions, GameMode } from "../slice";

describe("SettingsForm", () => {
  it("form contains correct initial values", () => {
    const wrapper = mount(<SettingsFormComponent gameMode={GameMode.FREE} fieldSize={2} {...actions} />);
    expect(wrapper.find("select[name='gameMode']").prop("value")).toBe(GameMode.FREE);
    expect(wrapper.find("select[name='fieldSize']").prop("value")).toBe(2);
  });
  it("submit calls the update reducer with correct payload", async () => {
    const update = jest.spyOn(actions, "update");
    const expectedValues = { gameMode: GameMode.FREE, fieldSize: 4 };
    const wrapper = mount(<SettingsFormComponent gameMode={GameMode.FREE} fieldSize={2} {...actions} />);

    await act(async () => {
      wrapper.find("select[name='gameMode']").simulate("change", {
        target: { name: "gameMode", value: expectedValues.gameMode },
      });
    });

    await act(async () => {
      wrapper.find("select[name='fieldSize']").simulate("change", {
        target: { name: "fieldSize", value: expectedValues.fieldSize },
      });
    });

    await act(async () => {
      wrapper.find("form").simulate("submit", { preventDefault: () => null });
    });

    expect(update).toHaveBeenCalledWith(expectedValues);
  });
  it("reset calls the reset reducer", async () => {
    const reset = jest.spyOn(actions, "reset");
    const wrapper = mount(<SettingsFormComponent gameMode={GameMode.RATING} fieldSize={4} {...actions} />);

    await act(async () => {
      wrapper.find("#js-reset").first().simulate("click");
    });

    expect(reset).toHaveBeenCalled();
  });
});
