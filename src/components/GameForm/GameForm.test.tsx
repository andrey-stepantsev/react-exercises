import React from "react";
import { act } from "react-dom/test-utils";
import { mount, ReactWrapper } from "enzyme";
import { GameSettings } from "../../containers/GamePageContainer/GamePageContainer";
import GameForm from "./GameForm";

const actImmediate = (wrapper: ReactWrapper) =>
  act(
    () =>
      new Promise<void>((resolve) => {
        setImmediate(() => {
          wrapper.update();
          resolve();
        });
      })
  );

describe("GameForm", () => {
  it("form contains correct initial values", () => {
    const initialValues: GameSettings = { userName: "AAA", fieldSize: 2 };
    const onSubmit = jest.fn();
    const onReset = jest.fn();
    const wrapper = mount(<GameForm initialValues={initialValues} onSubmit={onSubmit} onReset={onReset} />);
    expect(wrapper.find("input[name='userName']").prop("value")).toBe(initialValues.userName);
    expect(wrapper.find("select[name='fieldSize']").prop("value")).toBe(initialValues.fieldSize);
  });
  it("form submit is called with correct values", async () => {
    const initialValues: GameSettings = { userName: "AAA", fieldSize: 2 };
    const expectedValues: GameSettings = { userName: "Andrey Stepantsev", fieldSize: 4 };
    const onSubmit = jest.fn();
    const onReset = jest.fn();
    const wrapper = mount(<GameForm initialValues={initialValues} onSubmit={onSubmit} onReset={onReset} />);

    wrapper.find("input[name='userName']").simulate("change", {
      target: { name: "userName", value: expectedValues.userName },
    });

    wrapper.find("select[name='fieldSize']").simulate("change", {
      target: { name: "fieldSize", value: expectedValues.fieldSize },
    });

    wrapper.find("form").simulate("submit");
    await actImmediate(wrapper);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual(expectedValues);
  });
});
