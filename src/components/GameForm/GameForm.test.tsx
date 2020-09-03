import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { GameSettings } from "types/GameTypes";
import { GameMode } from "enums/GameEnums";
import GameForm from "./GameForm";

const initialValues: GameSettings = { gameMode: GameMode.RATING, userName: "Test", fieldSize: 2 };

const onSubmit = jest.fn();
const onReset = jest.fn();

describe("GameForm", () => {
  it("form contains correct initial values", () => {
    const wrapper = mount(<GameForm initialValues={initialValues} onSubmit={onSubmit} onReset={onReset} />);
    expect(wrapper.find("select[name='gameMode']").prop("value")).toBe(initialValues.gameMode);
    expect(wrapper.find("input[name='userName']").prop("value")).toBe(initialValues.userName);
    expect(wrapper.find("select[name='fieldSize']").prop("value")).toBe(initialValues.fieldSize);
  });
  it("form submit is called with correct values", async () => {
    const expectedValues: GameSettings = { gameMode: GameMode.FREE, userName: "Test Changed", fieldSize: 4 };
    const wrapper = mount(<GameForm initialValues={initialValues} onSubmit={onSubmit} onReset={onReset} />);

    await act(async () => {
      wrapper.find("input[name='userName']").simulate("change", {
        target: { name: "userName", value: expectedValues.userName },
      });
    });

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
      wrapper.find("form").simulate("submit");
    });

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual(expectedValues);
  });
});
